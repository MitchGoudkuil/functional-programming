require('dotenv').config()

const axios = require('axios');
const parseString = require('xml2js').parseString;

const siteURL = 'https://zoeken.oba.nl/api/v1/';
const query = 'search/?q=may';
const end = 'refine=true';

axios.get(siteURL + query + '&authorization=' + process.env.PUBLIC, + '&' + end)
 .then((response) => {
   // handle success


   parseString(response.data, function (err, result) {
   console.log(result);
   });

 })
 .catch(function (error) {
   // handle error
   console.log(error);
 });
