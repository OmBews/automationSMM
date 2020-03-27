
const ig = require("instagram-scraping");

ig.scrapeUserPage("testing_user_hello").then(async result => {
    console.log(result)
})