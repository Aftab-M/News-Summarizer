const translate = require('google-translate-api-x');
// Or of course
// import translate from 'google-translate-api-x';
// Or deconstruct all the exposed variables as
// import { translate, Translator, speak, singleTranslate, batchTranslate, languages, isSupported, getCode } from 'google-translate-api-x';
// or again
const { Translator, speak, singleTranslate, batchTranslate, languages, isSupported, getCode } = require('google-translate-api-x');

async function trnslt(txt, lang){
  const res = await translate(txt, {to: lang});

  // console.log(res.text); //=> I speak English
  // console.log(res.from.language.iso);  //=> nl
  return res.text;
}


// trnslt()

module.exports = {trnslt}