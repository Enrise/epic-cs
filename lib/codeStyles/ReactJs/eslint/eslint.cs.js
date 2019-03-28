const codeStyle = {
    name: 'eslint',
    setupDetails: [
        {
            name: 'setup',
            detail: 'npm install -D babel-core@^7.0.0-bridge.0 babel-eslint@^8.2.6 eslint@^5.2.0 eslint-plugin-jasmine@^2.10.1 eslint-plugin-react@^7.10.0'
        },
        {
            name: 'run-local',
            detail: 'node_modules/.bin/eslint . && echo "All files are formatted correctly."',
        },
        {
            name: 'run-pipeline',
            detail: 'node_modules/.bin/eslint . && echo "All files are formatted correctly."',
        },
    ]
};

module.exports = codeStyle;
