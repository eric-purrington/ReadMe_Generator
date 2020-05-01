function whichBadge(data) {

}

function generateMarkdown(data) {return `
# ${data.title}

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/${data.githubUsername}/${data.title})


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

After clone make a copy of .env.sample, and fill in your environement variables.


## License

This project is licensed under the ${data.license} license.
    

## Contributing

Hit me up on slack - I have lots for you to do.


## Tests

To run tests, run the following command:

\`\`\`
npm test
\`\`\`


## Questions

If you have any questions about the repo, open an issue or contact [johnfyoung](undefined) directly at john@codeandcreative.com.
`;}
  
module.exports = { generateMarkdown: generateMarkdown };
  