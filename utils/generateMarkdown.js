function generateMarkdown(data) {
  return ` 
# ${data.title}
${data.URL}
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

-Email: ${data.email} 

`;

}

module.exports = generateMarkdown;