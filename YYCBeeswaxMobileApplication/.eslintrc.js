module.exports = {
    root: true,
    extends: ["universe/native", "universe/shared/typescript-analysis"],
    rules: {
        eqeqeq: "off",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.d.ts"],
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
    ],
    "prettier/prettier": [
        "error",
        {
            endOfLine: "auto",
            tabWidth: 4,
        },
    ],
};
