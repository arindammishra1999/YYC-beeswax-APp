const fs = require("fs");

const filePath = "app/profile/ChangePasswordPage.tsx"; // Path to your component file

// Read the file contents
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Define regular expression patterns to match text that needs translation
    const textPatterns = [
        { pattern: /<Text style={[^>]*}>(.*?)<\/Text>/gi, needsCurly: true }, // Match <Text> tags and their content
        { pattern: /label="([^"]+)"/gi, needsCurly: true }, // Match label prop values
        { pattern: /header="([^"]+)"/gi, needsCurly: true }, // Match header prop values
        { pattern: /placeholder="([^"]+)"/gi, needsCurly: true }, // Match placeholder prop values
        { pattern: /title="([^"]+)"/gi, needsCurly: true }, // Match title prop values
        // Add more patterns for other text elements as needed
    ];

    // Apply patterns to the file contents
    let modifiedData = data;
    textPatterns.forEach(({ pattern, needsCurly }) => {
        modifiedData = modifiedData.replace(pattern, (match, p1) => {
            let curly;
            if (needsCurly) {
                curly = `{t("${p1}")}`;
            } else {
                curly = `t("${p1}")`;
            }
            return match.replace(`"${p1}"`, curly); // Replace quoted string with curly braces
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
