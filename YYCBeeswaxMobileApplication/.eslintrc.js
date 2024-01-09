module.exports = {
    root: true,
    extends: ["universe/native", "universe/shared/typescript-analysis"],
    ignorePatterns: ["expo-env.d.ts"],
    rules: {
        eqeqeq: "off",
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
