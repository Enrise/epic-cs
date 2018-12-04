const codeStyle = {
    name: 'sass-lint',
    setupDetails: [
        {
            name: 'instructions',
            detail: `
Sass-lint is used to inspect our sass code detecting issues and where possible applying quick fixes.

Please setup sass-lint for your editor using the rules within the root of this project (.sass-lint.yml).

For PhpStorm, you can download a plugin.
When doing so, please select the yaml config file location, as the plugin may not find the config otherwise.
(It will still work, but you would be unaware that it had the wrong rule-set.)

You could also setup auto-fixing files using a watcher and/or external tool (right click and fix).
In PhpStorm, go to preferences, tools, then file watchers/external tools.

Example watchers/external tool setup:

Program
\`\`\`
components/frontend/node_modules/.bin/sass-lint-auto-fix
\`\`\`

Arguments
\`\`\`
"$FilePathRelativeToProjectRoot$" -c components/frontend/.sass-lint.yml
\`\`\`

Bear in mind that only some sass-lint rules can be auto-fixed.
            `,
        },
        {
            name: 'setup',
            detail: 'npm install -D sass-lint@^1.12.1 sass-lint-auto-fix@^0.11.2'
        },
        {
            name: 'run-local',
            detail: 'node_modules/.bin/sass-lint -c .sass-lint.yml && echo "All files are formatted correctly."',
        },
        {
            name: 'run-pipeline',
            detail: 'node_modules/.bin/sass-lint -c .sass-lint.yml && echo "All files are formatted correctly."',
        },
    ]
};

module.exports = codeStyle;
