# Functional programming

## Research:

**Description**
A bubble chart from all the dutch thriller books that have the word Blood in the title. The chart shows the amount of pages on the X axis, the bookTitles on the y Axis, the amount of characters in the summary(the radius of the circle) and if the words Murder and kidnapping excist in the summary(colors of the circle).


**Table of contents:**
- Install packages
- Set up Api
- How aquabrowser works
- Find out about search-terms and keywords
  * Listing of questions
  * Dissection of questions into subquestions
- Findings


##### Installing the project:

      **Clone the repository**
      git clone https://github.com/MitchGoudkuil/functional-programming

      **Enter new directory**
      cd functional-programming

      **Create a .env file**
      touch .env

      **Add public and secret key to the .env file**
      PUBLIC=987654321
      SECRET=123456789

      **Install Packages needed**
      Check the packages listed below
      npm install

      # Start application
      npm run start

      check if running on: http://localhost:30000

**Packages used and sources to install:**
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


##### 💧 Learning aquabrowser:
  Document about using the Aquabrowser, about al the parameters, facets, etc send to us by Mark Vos from the Oba. [link](https://zoeken.oba.nl/api/v1/#/details)
  The documentation is a bit outdated and the explanation is not really that great.

**:key: Search terms ,keywords and parameters:**

To find out about all the subjects and facets you can search for, Daniel van de Velde made an amazing readme about it.
Props to Daniel van de Velde for this list and sharing it with us. [Source](https://github.com/DanielvandeVelde/functional-programming/blob/master/README.md)

I made a small list with the available data that was the most interesting, and probably needed for the visualisation:
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

#####:question: Listening subquestions and setting up the hypothesis


1. In how many of the disney books are the main characters humans?
2. If you put the 3 biggest trilogies next to each other, how high is the pile of books?
3. On which novels's summary are the most sexual words used?
4. Which books with the genre thriller has the most amount of the word blood in the summary? (Dutch and english)
5. Which Genre has the most amount of books.(too easy)

**Hypothesis**

How often does the word blood appear in the summary of dutch thrillers?

This hypothesis gave me data which was so small that I was not happy with it. So in the end I changed it to a different question. Which was:

In dutch thrillers with the word blood in the title, how much times does the word murder or kidnapping show up in the summmary? And is it true that books with more pages have a large summary?

Parameters needed/used to answer the questions:
- Genre
- Format (books)
- Language (Dut)
- Book Summary
- Book page count


##### Getting the data
To be able to get the data I changed the Api get request to as shown below:

``` js
      client.getAll('search',
      {
       q: 'title:bloed',
       librarian: true,
       refine: true,
       facet:'type(book)&facet=language(dut)&facet=genre(thriller)'
      },
      {
        page: 1,
        pagesize: 20,
        maxpages: 4
      })
```

The results gave me 46 dutch thrillers(books), each with the word blood in the title. Thanks to the Api that Folkert and Dennis made I was able to import more data. The data that the Api returned was a lot. So it is was necessary to make this data more compact and only with the data that I actually need.


**Making data smaller**
To make the data smaller I learned how to map over the data the Api provided me and how to make the data even smaller so I would only get the data that I needed.
``` js
let newarr = res.map(book => {
  let summaryBook = book.summaries && book.summaries[0] &&    book.summaries[0].summary && book.summaries[0].summary[0] &&    book.summaries[0].summary[0]['_'] ? book.summaries[0].summary[0]._ :    null
  let bookTitle = book.titles[0] && book.titles[0].title[0] &&    book.titles[0].title[0]['_'] ? book.titles[0].title[0]._ : null
  bookTitle = bookTitle.substring(0, bookTitle.indexOf("/")).trim()
  let bookMainAuthor = book.authors[0]['main-author']._
  let pageCount = book.description[0]['physical-description'][0]._
  pageCount = Number(pageCount.substring(0,    pageCount.indexOf("p")).trim())

  let basicInfo = [
    summaryBook,
    bookTitle,
    bookMainAuthor,
    pageCount
  ]

  if (!basicInfo.includes(null)){
    let murderWord = "moord"
    let kidnapWord = "ontvoer"
    let allInfo = {
      bookTitle : basicInfo[1],
      bookAuthor : basicInfo[2],
      titleLength : bookTitle.length,
      summaryBook : basicInfo[0],
      summaryLength : summaryBook.length,
      murderWordCheck : summaryBook.includes(murderWord),
      kidnapWordCheck : summaryBook.includes(kidnapWord),
      pageCount : basicInfo[3]
      // searchWordAmount : summaryBook ?    summaryBook.split(searchword).length-1 : null,
    }
    infoArr.push(allInfo)
  } else{
    "niet gevonden"
  }
})
```

After getting all the data and putting them in variables it was time to push them into an array that I could then export to a Json file to use with d3. That array is then returned as the value of the response.

**generating json**

Because the get request is done with a promise I made a new then in which I work with the server(first to lines in the THEN) and the json export(last two lines in the THEN).

``` js
.then(response => {
    app.get('/', (req, res) => res.json(response))
    app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
    data = JSON.stringify(response, null, 2 );
    fs.writeFileSync('src/bookdata.json', data);
})
```
With fs its able to export the response into a new generated file called bookdata.json. We now have the data that we need to make the visualisation :).


##### Sketching the visualisation
I made two sketches in which I wanted to design the look of the visualisation. This way I knew where I wanted to put the data on the axis.

*Sketch one:* At first I wanted to make a bar chart but I changed that rather quickly at the end.

![alt text](sketch1.png")

*Sketch two:* This is the way I wanted to make the graph. I chose for a bubble chart because in this way its nicer to show more datapoints.
