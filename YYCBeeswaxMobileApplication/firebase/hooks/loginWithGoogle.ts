import {
    GoogleAuthProvider,
    OAuthCredential,
    signInWithCredential,
    UserCredential,
} from "@firebase/auth";
import { useIdTokenAuthRequest } from "expo-auth-session/build/providers/Google";
import { useCallback, useEffect } from "react";

import { auth } from "@/firebase/config";
import { setUser } from "@/firebase/setCollections/setUser";

export function useLoginWithGoogle() {
    const [, authSessionResult, promptGoogle] = useIdTokenAuthRequest({
        selectAccount: true,
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    });

    // Handles the login via the Google Provider
    const handleLoginGoogle = async () => {
        await promptGoogle();
    };

    // Function that logs into firebase using the credentials from an OAuth provider
    const loginToFirebase = useCallback(
        async (credentials: OAuthCredential) => {
            const signInResponse = (await signInWithCredential(
                auth,
                credentials,
            )) as UserCredential & {
                _tokenResponse: { isNewUser?: boolean };
            };
            if (signInResponse._tokenResponse.isNewUser) {
                await setUser(signInResponse.user.uid, {
                    email: signInResponse.user.email,
                    name: signInResponse.user.displayName,
                });
            }
            console.log(signInResponse._tokenResponse.isNewUser);
            console.log(signInResponse);
        },
        [],
    );

    useEffect(() => {
        if (authSessionResult?.type === "success") {
            const credentials = GoogleAuthProvider.credential(
                authSessionResult.params.id_token,
            );
            loginToFirebase(credentials);
        }
    }, [authSessionResult]);

    return { handleLoginGoogle };
}
