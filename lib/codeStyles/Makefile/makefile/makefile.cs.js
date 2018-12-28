const path = require("path");
const fileName = "Makefile";
const fileSource = path.join(__dirname, `files/${fileName}`);

const codeStyle = {
    name: fileName,
    filesToCopy: [
        {
            fileName,
            fileSource,
            fileDestination: fileName
        }
    ]
};

module.exports = codeStyle;
