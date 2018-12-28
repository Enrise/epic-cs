const path = require('path');
const filePath = path.join(__dirname, 'files');
const fileNames = [
    '.eslintignore',
    '.eslintrc.json',
    '.prettierignore',
    '.prettierrc.yml',
];

const filesToCopy = fileNames.map(fileName => ({
    fileName,
    fileSource: `${filePath}/${fileName}`,
    fileDestination: `dev/git-hooks/${fileName}`,
}));

const codeStyle = {
    name: 'eslint',
    setupDetails: [
        {
            name: 'setup',
            detail: [
                'npm install -D',
                'babel-core@^7.0.0-bridge.0',
                'babel-eslint@^8.2.6',
                'eslint@^5.2.0',
                'eslint-config-prettier@^3.3.0',
                'eslint-plugin-jasmine@^2.10.1',
                'eslint-plugin-prettier@^3.0.0',
                'eslint-plugin-react@^7.10.0',
            ].join(' '),
        },
        {
            name: 'run-local',
            detail:
                'node_modules/.bin/eslint ./**/*.js && echo "All files are formatted correctly."',
        },
        {
            name: 'run-pipeline',
            detail:
                'node_modules/.bin/eslint ./**/*.js && echo "All files are formatted correctly."',
        },
    ],
    filesToCopy,
};

module.exports = codeStyle;
