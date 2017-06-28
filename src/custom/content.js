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
  '# INTRODUCTION\n' +
  fs.readFileSync('./content/introduction.md', 'utf8') + '\n' +
  '# TOPICS\n' +
  fs.readFileSync('./content/topics.md', 'utf8') + '\n' +
  '# COMMON\n' +
  fs.readFileSync('./content/common-resources.md', 'utf8') + '\n' +
  '# STOREFRONT\n' +
  fs.readFileSync('./content/storefront-resources.md', 'utf8') + '\n' +
  '# INVENTORY\n' +
  fs.readFileSync('./content/inventory-resources.md', 'utf8') + '\n' +
  '# DISTRIBUTION\n' +
  fs.readFileSync('./content/distribution-resources.md', 'utf8') + '\n' +
  '# Example\n' +
  fs.readFileSync('./content/example.md', 'utf8') + '\n';
