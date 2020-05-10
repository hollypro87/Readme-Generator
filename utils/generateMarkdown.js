function getUrl(username, title, link) {
  return `https://github.com/${username}/${title}`;
}

function getBadge(license, username, title, color, link) {
  if (license !== "None") {
    return `[![GitHub license](https://img.shields.io/badge/license-${license}-${color}.svg)](${getUrl(
      username,
      title,
      link
    )})`;
  } else {
    return ``;
  }
}
function generateMarkdown(data) {
  return ` 
# ${data.title}

${getBadge(data.license, data.username, data.title, data.color, data.URL)}

${data.description} 

# Table of Contents
* [Installation](# Installation)
* [Usage](# Usage)
* [License](# License)
* [Contributing](# Contributors)
* [Tests](# Tests)
* [FAQ](# FAQ)

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

If you have any questions about the repository please contact [${
    data.username
    }](https://github.com/${data.username}/) directly at ${data.email}. 

`;

}

module.exports = generateMarkdown;