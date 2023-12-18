/** @type {import('prettier').Options} */
const Prettierrc = {
  printWidth: 90,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  vueIndentScriptAndStyle: false,
  proseWrap: 'preserve',
};

try {
  Prettierrc = require('./dist/ide/PrettierrcT').PrettierrcT.getConfig();
} catch {}

module.exports = Prettierrc;
