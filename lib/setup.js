const fileSystem = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const handlebars = require('handlebars');

// todo: move code into appropriate files?

const codeStyles = [
    'PHP',
    'ReactJs',
    'Sass',
];

const questions = [
    {
        type: 'checkbox',
        name: 'codeTypes',
        message: 'Please select the code styles your project will use',
        choices: codeStyles
    },
];

const runSetup = () => inquirer
    .prompt(questions)
    .then(answers => {
        console.log(answers);
        generateReadMe();
    });


const moveEditorConfig = () => {
    const filename = '.editorconfig';
    const fileSource = path.join(__dirname, filename);
    const fileDestination = path.join(__dirname, `../${filename}`);

    console.log("\n=== Moving .editorconfig ===");

    fileSystem.copyFile(fileSource, fileDestination, error => {
        if (error) throw error;
        console.log('Done copying');
    });
};

const generateReadMe = () => {
    const fileDestination = path.join(__dirname, '../STYLE.md');
    const templateDestination = path.join(__dirname, 'templates/STYLE.hbs');
    fileSystem.readFile(templateDestination, 'utf8', function(error, templateContent) {
        if (error) throw error;

        const template = handlebars.compile(templateContent);
        const fileContent = template({
            files: [
                '.editorconfig',
                'somethingElse.js'
            ]
        });

        console.log("\n=== Creating STYLE.md ===");

        fileSystem.writeFile(fileDestination, fileContent, error => {
            if (error) throw error;
            console.log('STYLE.md created');
        });
    });
};

// const runSetup = () => moveEditorConfig();

module.exports = runSetup;
