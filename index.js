require('dotenv').config()

const api = require('./oba-api.js')
const chalk = require('chalk');
const express = require('express')
const app = express()
const port = 3000

const obaApi = new api({
 url: 'https://zoeken.oba.nl/api/v1/',
 key: process.env.PUBLIC
})

// Search for method, params and than optional where you wanna find something
// returns first 20 items
// obaApi.get(endpoint, params, filterKey)
// possible endpoints: search (needs 'q' parameter) | details (needs a 'frabl' parameter) | availability (needs a 'frabl' parameter) | holdings/root | index/x (where x = facet type (like 'book' ))
// possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object

// Zoek in de hoek van een object returnen in de map met meerdere keys

obaApi.get('search', {
 q: 'bloed',
 librarian: true,
 refine: true,
 facet: ['type(book)', 'genre(thriller)']
})

.then(response => {
  let res = response.data.aquabrowser.results[0]
  let newarr = res.result.map(book => {
    let individualBook = book.summaries[0].summary[0]._
    return individualBook

    // let individualBook = book.authors[0].author
    // if (individualBook) {
    //   console.log("gevonden")
    //   let authorNames = individualBook[0]._
    //   return authorNames
    // } else{
    //   console.log("niet gevonden")
    //   return "niet gevonden"
    // }
  })

  return newarr
})
.then(response => {
    app.get('/', (req, res) => res.json(response))
    app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
})




// Foreach over json parse
