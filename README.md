# Functional programming

## Research:

**Steps:**
- Install packages
- Set up Api
- How aquabrowser works
- Find out about search-terms and keywords
  * Listing of questions
  * Dissection of questions into subquestions
- Findings

##### Packages used and sources to install:
   * [Nodemon](https://nodemon.io/)
   // used to show console into bash
   * [axios](https://github.com/axios/axios)
   // used for requests to the API
   * [chalk](https://www.npmjs.com/package/chalk)
   // adding colors to errors etc
   * [dotenv](https://www.npmjs.com/package/dotenv)
   // Possibility to import an .env file with important information
   * [express](https://www.npmjs.com/package/express)
   * [jsonpath](https://www.npmjs.com/package/JSONPath)
   * [query-string](https://www.npmjs.com/package/query-string)
   * [xml-to-json-Promise](https://www.npmjs.com/package/xml-to-json-promise)
   * [xml2js](https://www.npmjs.com/package/xml2js)

##### Api Setup
  add index.js, oba-api.json and .env file. Dont forget to add the public and secret keys to the .env.

    PUBLIC=thekey
    SECRET=thekey

To start up node process in bash:

      npm run start

##### 💧 How aquabrowser works:
  Document about using the Aquabrowser [link](https://zoeken.oba.nl/api/v1/#/details)

##### :key: Search terms ,keywords and parameters:
Props to Daniel van de Velde for the list with all available search terms and keywords. [Source](https://github.com/DanielvandeVelde/functional-programming/blob/master/README.md)

Filtered list on most important and interesting keywords gained from XML search:
   * coverimages
     * coverimage
   * titles
     * title
     * short-title
     * other-title
   * Authors
     * main-author
     * author
   * formats (book/movie)
     * format
   * publication
     * year
     * publishers
       * publisher
   * languages
     * language
   * genres
     * genre (thriller)
   * summaries
     * summary

##### :question: Listing of questions
1. In how many of the disney books are the main characters humans?
2. If you put the 3 biggest trilogies next to each other, how high is the pile of books?
3. On which novels's summary are the most sexual words used?
4. Which books with the genre thriller has the most amount of the word blood in the summary? (Dutch and english)
5. Which Genre has the most amount of books.(too easy)

**:rocket: Most interesting search question:**
How often does the word blood appear in the summary of thrillers? (Dutch and english)

Parameters needed/used to answer the question:
- Genre
- Format (books)
- Language (Dut and eng)
- Summary

##### Findings
To be able to get the information to answer the question I made sub questions to make it easier. After this I started doing the research in the Oba API.

*Subquestion:* How many books are available with the word blood in it?
Changed the query to blood and added the facet type(book) to only get the books from the API

      obaApi.get('search', {
        'q': "bloed",
        'librarian': true,
        'facet': 'type(book)',
        'refine': true
      } ).then(response => {

Results: 640 books

*Subquestion:* How many thriller books with the word blood in it are available?
Next added the genre(thriller) to the facets

      obaApi.get('search', {
        'q': "bloed",
        'librarian': true,
        'facet': ['type(book)','genre(thriller)'],
        'refine': true
      } ).then(response => {

Results: 92 books


*Subquestion:* How many dutch thriller books with the word blood in it are available?
To only get the dutch books added language(dut) to the facets.

      obaApi.get('search', {
        'q': "bloed",
        'librarian': true,
        'facet': ['type(book)', 'genre(thriller)', 'language(dut)' ],
        'refine': true
      } ).then(response => {

Results: 70 books



## Proces:

_Week 1_
#### Monday:
   Started of with the introduction to the new Oba project and got some homework that we need to do for wednesday.

   Set-up Rijks Oba Api together with Daniël2 and got it working but started over again with Dennis so we would know how the code works. We did this because Daniël2 and me never worked with Node before.

   We got a really nice lecture about high-order functions and how to use them. The filter and reduce function that was used on my Vue project is a lot clearer for me now.

   Went to the karaoke bar and sang some Andre Hazes :beer:

#### Tuesday:

  There was no place for us at the Oba so we went to fest to work there. I set up the new Git repository for [functional programming](https://github.com/MitchGoudkuil/functional-programming) and connected it so I could start working on this README. Got the new api code from Dennis so I could find some of the search keywords to setup some research questions. It was quite hard to use, so at the end of the day I wrote down some made up questions that sounded nice to do research to.

**5 research questions:**
  - Which Genre gets rented out the most.
  - Which Genre has the most amount of books.
  - Whats the top ten most rented out books.
  - Of which publisher are the most books lent.
  - Are there more horror books rented out with Halloween than normal?


#### Wednesday:
  We started the day of with listing our questions to the class and we talked about what was unclear for us and how a lecture could help us understand how stuff works.

  I found out that most of my research questions were wrong because the information that I needed was not able to get at all, because of privacy rules. So I had to start over again.
  Thankfully Daniël1 made a [readme](https://github.com/DanielvandeVelde/functional-programming/blob/master/README.md) with all the available keywords so now I was able to connect dots and setup some new research questions.

  Laurens told us that it was allowed and important to share code with each other because it is really difficult for some of us to start working on it, including me. We got the new code that Dennis and Folkert made and Dennis gave me a speedcourse in how to use it.

  After this we got 2 lectures from Titus and Laurens. Laurens told us how get information from an Api and how to make this information smaller using the high-order functions which Titus told us about. Titus gave us a lecture about how to write a promise and what it does.

  I feel a lot more informed and I'm looking forward to working with the new stuff that I Learned.  

#### Thursday:
  Because the research questions that I wrote down were wrong and I started to get behind I started the day off with making a To-do list to be able to reach my goal at the end of the week.
  After the to-do list I made a new list with research questions, so I could finally start doing the research.

  :rocket: **To-do list**
  - [X] Learn how to work with the API and aquabrowser.
  - [X] Connect dots between variables from Daniël1's readme and set-up 5 research questions.
  - [ ] Deconstruct the questions and try to get the data from the API.
  - [ ] Import the json data into a new json file to deconstruct.
  - [ ] Make the json info smaller using the high-order functions.

  :question: **Research question**
  1. In how many of the disney books are the main characters humans?
  2. If you put the 3 biggest trilogies next to each other, how high is the pile of books?
  3. On which novels's summary are the most sexual words used?
  4. How often does the word blood appear in the summary of thrillers? (Dutch and english)
  5. Which Genre has the most amount of books.(too easy)

   The focus on the information
