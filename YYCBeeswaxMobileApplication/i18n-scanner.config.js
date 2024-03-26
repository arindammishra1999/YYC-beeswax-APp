module.exports = {
    input: "app/profile/ChangePasswordPage.tsx",
    output: "./locales/{{lng}}.json",
    options: {
        debug: true,
        func: {
            list: ["t", "i18next.t"],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        trans: {
            component: "Trans",
            extensions: [],
        },
        lngs: ["en", "fr", "es", "de", "it"], // Add more languages as needed
        ns: ["translation"],
        defaultLng: "en",
        defaultNs: "translation",
        defaultValue: "__STRING_NOT_TRANSLATED__",
        resource: {
            loadPath: "locales/{{lng}}.json",
            savePath: "locales/{{lng}}.json",
            jsonIndent: 2,
            lineEnding: "\n",
        },
        removeUnusedKeys: false,
        keySeparator: false, // Disable key separator
        nsSeparator: false, // Disable namespace separator
    },
};
