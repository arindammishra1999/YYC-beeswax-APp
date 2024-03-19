const fs = require("fs");

const filePath = "app/events/EventsPage.tsx"; // Path to your component file

// Read the file contents
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Define regular expression patterns to match text that needs translation
    const textPatterns = [
        {
            // Match <Text> tags without style attributes and their content
            pattern: /<Text\s*>(.*?)<\/Text>/gi,
            needsCurly: true, // Set needsCurly to false for <Text> elements without style attributes
        },
        {
            // Match <Text> tags with style attributes and their content
            pattern: /<Text\s+style={([^>]*)}>\s*([^<]+)\s*<\/Text>/gi,
            needsCurly: true,
        },
        { pattern: /label="([^"]+)"/gi, needsCurly: true }, // Match label prop values
        { pattern: /header="([^"]+)"/gi, needsCurly: true }, // Match header prop values
        { pattern: /placeholder="([^"]+)"/gi, needsCurly: true }, // Match placeholder prop values
        { pattern: /title="([^"]+)"/gi, needsCurly: true }, // Match title prop values
        // Add more patterns for other text elements as needed
    ];

    // Apply patterns to the file contents
    let modifiedData = data;
    textPatterns.forEach(({ pattern, needsCurly }) => {
        modifiedData = modifiedData.replace(pattern, (match, p1, p2) => {
            let translatedText = needsCurly ? `{t("${p2}")}` : `t("${p2}")`;
            return match.replace(p2, translatedText);
        });
    });

    // Write modified data back to the file
    fs.writeFile(filePath, modifiedData, "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("Translation tags added successfully.");
    });
});
