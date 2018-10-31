require('dotenv').config()

const axios = require('axios');
const parseString = require('xml2js').parseString;

const queryToString = require('query-string').stringify

const siteURL = 'https://zoeken.oba.nl/api/v1/';


const query = '&librarian=true&q=harry%20potter&refine=true';


var searchTerms = {
  'frabl': '23E3EDD32F360A7'
}

const endPoint = 'search'

const totalURL = siteURL + endPoint + '/?authorization=' + process.env.PUBLIC + '&' + queryToString(searchTerms)

//const end = '&librarian=true&q=harry%20potter&refine=true';

axios.get(totalURL)
 .then((response) => {
   // handle success


   parseString(response.data, function (err, result) {

   console.log(result);
   });

 })
 .catch(function (error) {
   // handle error
   console.log(error);
   console.log(totalURL)
 });
