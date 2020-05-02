function generateMarkdown(data) {return `
# ${data.title}

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/${data.githubUsername}/${data.title})
![Github last commit](https://img.shields.io/github/last-commit/${data.githubUsername}/${data.title})

## Description

${data.description}


## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)


## Installation

To install necessary dependencies, run the following command:

\`\`\`
${data.depCommand}
\`\`\`


## Usage

${data.usage}


## License

This project is licensed under the ${data.license} license.
    

## Contributing

${data.contribution}


## Tests

To run tests, run the following command:

\`\`\`
${data.testing}
\`\`\`
## Tech from others

${data.othersTech}


## Acknowledgments

I would like to thank ${data.acknowledgments} for helping through this project. 


## Questions

If you have any questions about the repo, open an issue ${data.githubEmail}. 
`;}
  
module.exports = { generateMarkdown: generateMarkdown };
  