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
 app.post('/post', async (req, res, next) => {
   res.setHeader('Content-Type', 'application/json');
   var title = req.body.title || null;
   var body = req.body.body || null;

   //db allows posting null values, so we have to catch them here
   if (!(title && body)) {
     res.status(400).send({
       "message":"Invalid request",
       "title":title,
       "body":body
     });
   } else {
     try {
       const db = await dbPromise;
       const post = await db.run("INSERT INTO posts VALUES ($id, $title, $body)", {
         $id: null,
         $title: req.body.title,
         $body: req.body.body
       });
       res.send(post);
     } catch (err) {
       res.send(err);
     }
   }
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
