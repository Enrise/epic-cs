const codeStyle = {
    name: 'phpcpd',
    exampleCommands: [
        {
            name: 'setup',
            command: 'composer require --dev sebastian/phpcpd "^4.0.0"'
        },
        {
            name: 'run',
            command: 'bin/phpcpd src/ tests/ --exclude vendor/',
        },
    ]
};

module.exports = codeStyle;
