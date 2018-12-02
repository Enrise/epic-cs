const path = require('path');
const filePath = path.join(__dirname, 'files');
const fileNames = ['.prettierignore', '.prettierrc.yml'];

const filesToCopy = fileNames.map(fileName => ({
    fileName,
    fileSource: `${filePath}/${fileName}`,
    fileDestination: fileName,
}));

const codeStyle = {
    name: 'prettier',
    setupDetails: [
        {
            name: 'instructions',
            detail: `
Prettier is a tool that will help us with our code-styling. After every edit you make,
prettier will format the code according to correct style rules. This will give us an
uniform code style, making it easy for us to focus on what's important.

In PhpStorm, you can setup prettier to run automatically:
https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher

A code style job will fail if you're not running the tool.

Or, if you prefer you can run the fix command when you choose to. A plugin is also available.
            `,
        },
        {
            name: 'setup',
            detail: 'npm install -D prettier@^1.13.7'
        },
        {
            name: 'run-local',
            detail: 'node_modules/.bin/prettier -l "./**/*.js" && echo "All files are formatted correctly."',
        },
        {
            name: 'run-pipeline',
            detail: 'node_modules/.bin/prettier -l "./**/*.js" && echo "All files are formatted correctly."',
        },
    ],
    filesToCopy
};

module.exports = codeStyle;
