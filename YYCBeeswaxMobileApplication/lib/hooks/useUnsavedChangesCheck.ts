import {
    EventArg,
    EventMapCore,
    NavigationState,
} from "@react-navigation/core";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

export function useUnsavedChangesCheck(isSaved: boolean) {
    const navigation = useNavigation();

    useEffect(() => {
        function unsavedChanges(
            e: EventArg<
                Extract<"beforeRemove", string>,
                EventMapCore<NavigationState>["beforeRemove"]["canPreventDefault"],
                EventMapCore<NavigationState>["beforeRemove"]["data"]
            >,
        ) {
            if (isSaved) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert(
                "Discard Changes?",
                "You have unsaved changes. Are you sure you want to discard them and leave this screen?",
                [
                    {
                        text: "Don't Leave",
                        style: "cancel",
                        onPress: () => {},
                    },
                    {
                        text: "Discard",
                        style: "destructive",
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ],
            );
        }

        navigation.addListener("beforeRemove", unsavedChanges);

        return () => {
            navigation.removeListener("beforeRemove", unsavedChanges);
        };
    }, [isSaved]);
}
