const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function generateMarkdown(data) {
    return ` 
  # ${data.title}
  ${data.description} 

  https://img.shields.io/github/contributors/${data.username}/${data.title}?style=plastic

  # Table of Contents
  * Installation
  * Usage
  * License
  * Contributing
  * Tests
  * FAQ

  # Installation
   ${data.installation}

  # Usage
   ${data.usage}

  # Contributors
   ${data.contributing}

  # License
   ${data.license}

  # Tests
   ${data.tests}

  # FAQ
   ${data.questions}
  
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
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: validateEmail,
        },
    ]);
}
async function init() {
    try {
        const answers = await promptUser();

        const md = generateMarkdown(answers);

        await writeFileAsync("README.md", md);

        console.log("Successfully wrote README.md file.");
    } catch (err) {
        console.log(err);
    }
}

init();