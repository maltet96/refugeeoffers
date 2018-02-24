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

router.get('/', function(req, res, next) {
  client.getEntries({
    'locale': req.query.lang,
    'limit': 1000
  }).then(function (entries) {

    // filter the first categories out of all entries fetched
    entriesFilteredForCategory = entries.items.filter(function(entry){
        return entry.sys.contentType.sys.id == 'firstCategory'
    })

    let categories = entriesFilteredForCategory.map((category) => {
      return {
        name: category.fields.title,
        icon: category.fields.icon,
        id: category.sys.id
      }
    }).sort(function(a, b){
      return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
    })

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

    // filter the lnguages out of all entries fetched
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

    // filter only imprint out of all entries fetched
    entriesFilteredForImprint = entries.items.filter(function(entry){
      return entry.sys.contentType.sys.id == 'imprint'
    })

    let imprint = entriesFilteredForImprint.map((imprint) => {
      return {
        content: imprint.fields.content,
        title: imprint.fields.title
      }
    })[0]

    // filter the offerings  out of all entries fetched
    let entriesFilteredForOfferings = entries.items.filter(function(entry){
      return entry.sys.contentType.sys.id == 'offering'
    })

    let allOfferings = entriesFilteredForOfferings.map((offering) => {

      return {
        name: offering.fields.title,
        firstCategories: offering.fields.nd1stCategory,
        secondCategories: offering.fields.nd2ndCategory,
        institution: offering.fields.institution,
        picture: offering.fields.picture ? offering.fields.picture.fields.file.url : offering.fields.picture,
        description: (offering.fields.description)? offering.fields.description.split(/\n|\s\n/).join("<br>\n") + "<br>" : null,
        openingHours: offering.fields.openingHours ? offering.fields.openingHours.replace(";", "<br>") : null,
        contactPersonPhoneNumber: offering.fields.contactPersonPhoneNumber,
        contactPersonEmailAddress: offering.fields.contactPersonEmailAddress,
        website: offering.fields.website,
        contactPerson: offering.fields.ansprechpartner,
        address: offering.fields.adresse
      }
    }).sort(function(a, b){
      return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
    })

    res.render('first', {
      imprint: imprint,
      categories: categories,
      frontPage: frontPage,
      languages: languages,
      chosenLang: req.query["lang"],
      offerings: allOfferings
    });
  }).catch(next);
});

module.exports = router;
