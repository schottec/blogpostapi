const express = require('express');
const sqlite = require('sqlite');
const Promise = require('bluebird');
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
 app.get('/posts', async (req, res, next) => {
   try {
     const db = await dbPromise;
     const posts = await db.all('SELECT * from posts');
     res.send(posts);
   } catch (err) {
     next(err);
   }
 })

/* POST
 * @param title
 * @param body
 */
 app.post('/post', function (req, res) {
   res.send("POST to database");
 })

 // open db
 Promise.resolve()
   .then(() => {
     if ( process.env.NODE_ENV == 'test') {
       dbPromise = sqlite.open('./test.db', { Promise });
     } else {
       dbPromise = sqlite.open('./blog.db', { Promise });
     }
   })
   .catch((err) => console.error(err.stack));

//start listening
app.listen(port, () => console.log('Listening on port ' + port));
