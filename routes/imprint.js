var express = require('express');
var router = express.Router();
const contentful = require('contentful')



// contentful setup

const SPACE_ID = 'tjuqohmohv21'
const ACCESS_TOKEN = 'e3070ba893e6549dfd7a4228bb8d2293da869a54c0285bd0b83d1b3f92570b70'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})

router.get('/', function(req, res, next) {
  
  // get all first level categories
  client.getEntries({
    'locale': req.query.lang
  })
  .then(function (entries) {

  
    // filter only first categories out of all entries fetched
    entriesFilteredForImprint = entries.items.filter(function(entry){
        return entry.sys.contentType.sys.id == 'imprint'
    })

    let imprint = entriesFilteredForImprint.map((imprint) => {
      return {
        content: imprint.fields.content,
        title: imprint.fields.titlte
      }
    })[0]

    // filter the front page elements out of all entries fetched
    entriesFilteredForFrontPage = entries.items.filter(function(entry){
        return entry.sys.contentType.sys.id == 'frontPage'
    })
    
    let frontPage = entriesFilteredForFrontPage.map((element) => {
      return {
        title: element.fields.title,
        description: element.fields.description
      }
    })[0]
  
  

  // filter the front page elements out of all entries fetched
  entriesFilteredForLanguages = entries.items.filter(function(entry){
      return entry.sys.contentType.sys.id == 'language'
  })
  
  // filter the langauges out of all entries fetched
  let languages = entriesFilteredForLanguages.map((language) => {
    
    return {
      name: language.fields.name,
      short: language.fields.shortForm,
      code: language.fields.languageCode
    }
  })


    res.render('imprint', { 
      imprint: imprint,
      languages: languages,
      chosenLang: req.query["lang"],
      frontPage: frontPage
    });
  })
});

module.exports = router;
