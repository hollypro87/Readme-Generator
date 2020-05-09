const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const md = require("generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);

function generateMarkdown(data) {
    return `
  # ${data.title}

  # ${data.description}

  # Table of Contents
  * Installation
  * Usage
  * License
  * Contributing
  * Tests
  * FAQ

  # ${data.installation}

  # ${data.usage}

  # ${data.contributing}

  # ${data.tests}

  # ${data.questions}
  
  `;

}

module.exports = generateMarkdown;

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "title",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "What is a brief description of your project?"
        },
        {
            type: "input",
            name: "installation",
            message: "How do you install this program?"
        },
        {
            type: "input",
            name: "usage",
            message: "How do you use this program?"
        },
        {
            type: "input",
            name: "license",
            message: "Enter license information here."
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter who has contributed to this program."
        },
        {
            type: "input",
            name: "tests",
            message: "How do you test if the program is working?"
        },
        {
            type: "input",
            name: "questions",
            message: "Enter frequently asked questions here."
        }
    ]);
}
async function init() {
    console.log("hi")
    try {
        const answers = await promptUser();

        const md = generateMarkdown(answers);

        await writeFileAsync("README.md", md);

        console.log("Successfully wrote ReadMe file.");
    } catch (err) {
        console.log(err);
    }
}

init();