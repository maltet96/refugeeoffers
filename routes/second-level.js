var express = require('express');
var router = express.Router();
const contentful = require('contentful')

// contentful setup
const SPACE_ID = 'tjuqohmohv21'
const ACCESS_TOKEN = 'e3070ba893e6549dfd7a4228bb8d2293da869a54c0285bd0b83d1b3f92570b70'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

router.get('/:firstCategory', function(req, res, next) {
  
  // get all first level categories
  client.getEntries({
    'locale': req.query.lang,
    'limit': 1000
  })
  .then(function (entries) {

    let categoryInfos = entries.items.find(function(entry){
      return entry.sys.contentType.sys.id == 'firstCategory' && entry.sys.id == req.params["firstCategory"]
    }).fields

    // filter the categories  out of all entries fetched
    let entriesFilteredForCategories = entries.items.filter(function(entry){
      return entry.sys.contentType.sys.id == 'secondCategory'
    })

    let allCategories = entriesFilteredForCategories.map((category) => {
      return {
        name: category.fields.title,
        icon: category.fields.icon,
        id: category.sys.id,
        firstCategories: category.fields.firstCateogories,
        firstLevel: req.params["firstCategory"]
      }
    })

    let categories = allCategories.filter(function(category){
      let validFirstCategories = category.firstCategories.map((category) => {
        return category.sys.id
      });
      return validFirstCategories.includes(req.params["firstCategory"]);
    }).sort(function(a, b){
      return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
    })

    // filter the langages out of all entries fetched
    entriesFilteredForLanguages = entries.items.filter(function(entry){
      return entry.sys.contentType.sys.id == 'language'
    })

    // filter the languages out of all entries fetched
    let languages = entriesFilteredForLanguages.map((language) => {
      
      // make de and en appear first 
      if(language.fields.shortForm == "de"){
        language.order = 1;
      }
      else if(language.fields.shortForm == "en"){
        language.order = 2;
      }
      else {
        language.order = 3
      }
      
      // for some reason Contentful fucks with Somali and delivers the full name as the language code, so we are changing it manually now
      if(language.fields.languageCode == "Somali"){
        language.fields.languageCode = "so"
      }

      return {
        name: language.fields.name,
        short: language.fields.shortForm,
        code: language.fields.languageCode,
        order: language.order
      }
    }).sort(function(x,y){ return x.order <= y.order ? 1 : -1});

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

    // filter only imprint out of all entries fetched
    entriesFilteredForImprint = entries.items.filter(function(entry){
      return entry.sys.contentType.sys.id == 'imprint'
    })
      
    let imprint = entriesFilteredForImprint.map((imprint) => {
        return {
            content: imprint.fields.content,
            title: imprint.fields.titlte
          }
    })[0]

    res.render('second', { 
      categories: categories,
      languages: languages,
      frontPage: frontPage,
      chosenLang: req.query["lang"],
      imprint: imprint,
      referer: req.headers.referer,
      color: "color" + req.query["color"],
      category: categoryInfos
    });
  })
});

module.exports = router;
