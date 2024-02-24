// emailContent.js
const Mailgen = require('mailgen');


const generateEmailContent = (userData,emailContent) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Rate Relay',
      link: 'https://mailgen.js/',
    },
  });

  const response = {
    body: {
      name: emailContent.name,
      intro: emailContent.intro,
      table: {
        data: userData,
      },
      outro: emailContent.outro,
    },
  };

  return mailGenerator.generate(response);
};

module.exports = {
    generateEmailContent,
};
