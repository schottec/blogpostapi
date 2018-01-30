const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// parse incoming JSON
app.use(bodyParser.json());

/*****ROUTES******/
/* Including routes in app.js for simplicity and readability */

/* GET
 * Returns all posts as JSON array
 */
app.get('/posts', function (req, res) {
  res.send("GET request");
})

/* POST
 * @param title
 * @param body
 */
 app.post('/post', function (req, res) {
   res.send("POST to database");
 })

//start listening
app.listen(port, () => console.log('Listening on port ' + port));
