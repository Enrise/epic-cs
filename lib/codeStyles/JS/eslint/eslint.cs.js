const path = require('path');
const filePath = path.join(__dirname, 'files');
const fileNames = ['.eslintignore', '.eslintrc.json'];

const filesToCopy = fileNames.map(fileName => ({
    fileName,
    fileSource: `${filePath}/${fileName}`,
    fileDestination: fileName
}));

const codeStyle = {
    name: 'eslint',
    setupDetails: [
        {
            name: 'setup',
            detail: 'npm install -D eslint@^5.12.0'
        },
        {
            name: 'run-local',
            detail:
                'node_modules/.bin/eslint . && echo "All files are formatted correctly."'
        },
        {
            name: 'run-pipeline',
            detail:
                'node_modules/.bin/eslint . && echo "All files are formatted correctly."'
        }
    ],
    filesToCopy
};

module.exports = codeStyle;
