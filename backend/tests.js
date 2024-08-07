const translate = require('google-translate-api-x');

const { Translator, speak, singleTranslate, batchTranslate, languages, isSupported, getCode } = require('google-translate-api-x');

async function trnslt(txt, lang){
  const res = await translate(txt, {to: lang});
  return res.text;
}


module.exports = {trnslt}