const fileSystem = require('fs');
const path = require('path');

const moveEditorConfig = () => {
    const filename = '.editorconfig';
    const fileSource = path.join(__dirname, filename);
    const fileDestination = path.join(__dirname, `../${filename}`);

    console.log("\n=== Moving .editorconfig ===\n");

    fileSystem.copyFile(fileSource, fileDestination, error => {
        if (error) throw error;
        console.log('Done copying!');
    });
};

const runSetup = () => moveEditorConfig();

module.exports = runSetup;
