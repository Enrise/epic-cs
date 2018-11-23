const codeStyle = {
    name: 'phpcpd',
    exampleCommands: {
        setup: 'composer require --dev sebastian/phpcpd "^4.0.0"',
        run: 'bin/phpcpd src/ tests/ --exclude vendor/',
    }
};

module.exports = codeStyle;
