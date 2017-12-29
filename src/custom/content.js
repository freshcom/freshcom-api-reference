var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports =
  '# TOPICS\n' +
  fs.readFileSync('./content/topics.md', 'utf8') + '\n' +
  '# IDENTITY\n' +
  fs.readFileSync('./content/identity.md', 'utf8') + '\n' +
  '# STOREFRONT\n' +
  fs.readFileSync('./content/storefront.md', 'utf8') + '\n' +
  '# CATALOGUE\n' +
  fs.readFileSync('./content/catalogue.md', 'utf8') + '\n' +
  '# CRM\n' +
  fs.readFileSync('./content/crm.md', 'utf8') + '\n' +
  '# BALANCE\n' +
  fs.readFileSync('./content/balance.md', 'utf8') + '\n' +
  '# GOODS\n' +
  fs.readFileSync('./content/goods.md', 'utf8') + '\n' +
  '# FILE STORAGE\n' +
  fs.readFileSync('./content/file-storage.md', 'utf8') + '\n' +
  '# Example\n' +
  fs.readFileSync('./content/example.md', 'utf8') + '\n';
