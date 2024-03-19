const fs = require("fs");

const sourceFilePath = "app/events/EventsPage.tsx"; // Path to your source component file
const translationFilePath = "locales/en.json"; // Path to your translation file

// Read the source file contents
fs.readFile(sourceFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Define regular expression pattern to match text wrapped in t()
    const pattern = /t\((.*?)\)/gi;

    // Match phrases wrapped in t() and use them as keys and values in the JSON object
    let translations = {};
    let match;
    while ((match = pattern.exec(data)) !== null) {
        let phrase = match[1].trim();
        const cleanedPhrase = phrase.replace(/['"]+/g, ""); // Remove all quotes
        translations[cleanedPhrase] = cleanedPhrase;
    }

    // Read the existing translation file
    fs.readFile(translationFilePath, "utf8", (err, existingData) => {
        if (err) {
            console.error("Error reading translation file:", err);
            return;
        }

        // Parse the existing JSON data
        let existingTranslations = {};
        try {
            existingTranslations = JSON.parse(existingData);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return;
        }

        // Merge the existing translations with the new translations
        translations = { ...existingTranslations, ...translations };

        // Stringify the translations object
        let translationsJSON = JSON.stringify(translations, null, 2);

        // Write the updated translations back to the file
        fs.writeFile(translationFilePath, translationsJSON, "utf8", (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return;
            }
            console.log("Translations updated successfully.");
        });
    });
});
