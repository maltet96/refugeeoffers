var express = require('express');
var router = express.Router();
const contentful = require('contentful')

// contentful setuo

const SPACE_ID = 'tjuqohmohv21'
const ACCESS_TOKEN = 'e3070ba893e6549dfd7a4228bb8d2293da869a54c0285bd0b83d1b3f92570b70'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})

router.get('/:firstCategory/:secondCategory', function(req, res, next) {
  
  // get all first level categories
  client.getEntries({
    'content_type': 'offering'
  })
  .then(function (entries) {
    let allOfferings = entries.items.map((offering) => {
      return {
        name: offering.fields.title,
        firstCategories: offering.fields.firstcategory,
        secondCategories: offering.fields.secondCategory,
        institution: offering.fields.institution,
        description: offering.fields.description,
        openingHours: offering.fields.openingHours,
        contactPersonPhoneNumber: offering.fields.contactPersonPhoneNumber,
        contactPersonEmailAddress: offering.fields.contactPersonEmailAddress,
        website: offering.fields.website,
        contactPerson: offering.fields.ansprechpartner,
        address: offering.fields.adresse
      }
    })

    let offerings = allOfferings.filter(function(offering){
        
        // currently only one category is returned each -- this needs to be changed in the model to be an array and then mapped as in the secondlevel
        let validFirstCategories = offering.firstCategories.fields.title;
        let validSecondCategories = offering.secondCategories.fields.title;
        return validFirstCategories == req.params["firstCategory"] && validSecondCategories == req.params["secondCategory"];
    })

    console.log(offerings);


    res.render('third', { offerings: offerings });
  })
});

module.exports = router;
