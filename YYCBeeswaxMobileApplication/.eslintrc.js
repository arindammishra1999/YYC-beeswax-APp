module.exports = {
    root: true,
    extends: ["universe/native", "universe/shared/typescript-analysis"],
    rules: {
        eqeqeq: "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                tabWidth: 4,
            },
        ],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.d.ts"],
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
    ],
};
