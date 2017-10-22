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

router.get('/', function(req, res, next) {
  
  // get all first level categories
  client.getEntries({
    'content_type': 'firstCategory'
  })
  .then(function (entries) {

    let categories = entries.items.map((category) => {
      return {
        name: category.fields.title,
        icon: category.fields.icon
      }
    })

    console.log(categories);

    res.render('first', { categories: categories });
  })
});

module.exports = router;
