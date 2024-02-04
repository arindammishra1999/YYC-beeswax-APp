module.exports = {
    root: true,
    extends: ["universe/native", "universe/shared/typescript-analysis"],
    ignorePatterns: ["expo-env.d.ts"],
    rules: {
        eqeqeq: "off",
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "react-native",
                        importNames: ["Image", "FlatList"],
                        message:
                            "Please import 'Image' from 'expo-image' and 'FlashList' from '@shopify/flash-list' instead.",
                    },
                ],
            },
        ],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.d.ts"],
            parserOptions: {
                project: "**/tsconfig.json",
            },
        },
    ],
};
