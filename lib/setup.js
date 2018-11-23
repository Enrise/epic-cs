const fileSystem = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const handlebars = require('handlebars');

// todo: move code into appropriate files?

const generateCodeStylesArray = new Promise((resolve, reject) => {
    fileSystem.readdir(
        path.join(__dirname, 'codeStyles'),
        (error, codeStyles) => {
            if (error) reject(error);
            resolve(codeStyles.filter(codeStyle => codeStyle !== 'default'));
        }
    );
});

const runSetup = async () => {
    const codeStyles = await generateCodeStylesArray;

    const questions = [
        {
            type: 'checkbox',
            name: 'codeTypes',
            message: 'Please select the code styles your project will use',
            choices: codeStyles
        },
    ];

    const userResponse = await inquirer.prompt(questions);

    const codeStylesToProcess = [
        'default',
        ...userResponse['codeTypes'],
    ];

    console.log(codeStylesToProcess); // todo: read from each folder and process...

    // generateReadMe();

}


const moveFile = (fileName, fileSource, fileDestination) => {
    const relativeFileDestination = path.join(__dirname, fileDestination);

    console.log(`\n=== Moving ${fileName} ===`);

    fileSystem.copyFile(fileSource, relativeFileDestination, error => {
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
        const fileContent = template({ // todo: replace this with the real content
            files: [
                '.editorconfig',
                'somethingElse.js'
            ]
        }); // todo: add the example commands here also

        console.log("\n=== Creating STYLE.md ===");

        fileSystem.writeFile(fileDestination, fileContent, error => {
            if (error) throw error;
            console.log('STYLE.md created');
        });
    });
};

// const runSetup = () => moveEditorConfig();

module.exports = runSetup;
