# Blog Post API

Hello!

This repository contains everything needed to interact with a simple blog post API.

The API is accessible via a simple Node.js server utilizing a SQLite database file
for persistent data.

# API Implementation

1. GET /posts
  * Endpoint: '/posts'
  * Method: GET
  * Response format: JSON
2. POST /post
  * Endpoint: '/post'
  * Method: POST
  * Response format: JSON
  * Parameters:
    * title (required)
    * body (required)


# How to deploy and run the Blog Post API
There are two methods provided to deploy and run the Blog Post API, depending on
your preference or which environment you have available. Both methods assume you
already have the appropriate Vagrant or Docker environments installed and
running, and have cloned the repository to your local environment.

* Using Vagrant
  1. From the main project directory, run
     $ vagrant up
  2. Once finished, proceed to test the API endpoints (see examples below)
  3. When done testing, run:
     $ vagrant halt

* Using Docker
  1. From the main project directory, first build the Docker image:
     $ docker build -t <NAME> .
  2. Next, run the docker image:
     $ docker run -p <PORT>:8080 -d <NAME>
  3. Proceed to test the API endpoints (see example below)

# Example tests

/GET
$curl -X GET 'http://localhost:8080/posts'

example response:
[
    {
        "post_id": 1,
        "title": "hai",
        "body": "hai"
    },
    {
        "post_id": 2,
        "title": "Sample Title",
        "body": "Sample body 1"
    }
]

/POST
curl -X POST \
  http://localhost:8080/post \
  -H 'content-type: application/json' \
  -d '{
	"title": "Sample Title",
	"body": "Sample body 1"
}'

example response:
{
    "stmt": {
        "sql": "INSERT INTO posts VALUES ($id, $title, $body)",
        "lastID": 2,
        "changes": 1
    }
}
