import {GoogleAuthProvider, OAuthCredential, signInWithCredential} from "@firebase/auth";
import {auth} from './config'
import {useIdTokenAuthRequest} from "expo-auth-session/build/providers/Google";
import {useCallback, useEffect} from "react";

export function useLoginWithGoogle() {
    const [googleAuthRequest, authSessionResult, promptGoogle] = useIdTokenAuthRequest({
        selectAccount: true,
        clientId:'470231171912-icirnco6no2bckh3b46nd5fjhc5kbjae.apps.googleusercontent.com',
        androidClientId:'470231171912-icirnco6no2bckh3b46nd5fjhc5kbjae.apps.googleusercontent.com',
        iosClientId:'720523949389-uhqc3r2mds6u51ragnv8nh21ng40hv7q.apps.googleusercontent.com'
    })

    // Handles the login via the Google Provider
    const handleLoginGoogle = async () => {
        await promptGoogle();
    };

    // Function that logs into firebase using the credentials from an OAuth provider
    const loginToFirebase = useCallback(async (credentials: OAuthCredential) => {
        const signInResponse = await signInWithCredential(auth, credentials);
        console.log(signInResponse)
    }, []);

    useEffect(() => {
        if (authSessionResult?.type === 'success') {
            const credentials = GoogleAuthProvider.credential(
                authSessionResult.params.id_token
            );
            loginToFirebase(credentials);
        }
    }, [authSessionResult]);

    return {handleLoginGoogle}
}
