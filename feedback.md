## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

<!-- NOT COMPLETED YET

### GET `/api/articles`

Assertion: expected 405 to equal 200

Hints:
- use a 200 status code


### GET `/api/articles`

Assertion: expected { msg: 'Method not allowed' } to contain key 'articles'

Hints:
- send articles to the client in an object, with a key of articles: `{ articles: [] }`
- use the data from the `test-data` in your tests


### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:
- the default sort should be by `created_at` and the default order should be `desc`


### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:
- add a `comment_count` property to each article
- join to the `comments` table, as this information lives there
- use an aggregate `COUNT` function
- use `GROUP BY` to avoid duplicate rows


### GET `/api/articles?sort_by=author`

Assertion: Cannot read property '0' of undefined

Hints:
- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article


### GET `/api/articles?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:
- accept an `order` query of `asc` or `desc`


### GET `/api/articles?author=butter_bridge`

Assertion: Cannot read property 'every' of undefined

Hints:
- accept an `author` query of any author that exists in the database
- use `where` in the model


### GET `/api/articles?topic=mitch`

Assertion: Cannot read property 'every' of undefined

Hints:
- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model


### GET `/api/articles?author=lurker`

Assertion: expected 405 to equal 200

Hints:
- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the user exists


### GET `/api/articles?topic=paper`

Assertion: expected 405 to equal 200

Hints:
- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists


### GET `/api/articles?topic=not-a-topic`

Assertion: expected 405 to equal 404

Hints:
- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists


### GET `/api/articles?author=not-an-author`

Assertion: expected 405 to equal 404

Hints:
- use a 404 status code, when provided a non-existent author
- use a separate model to check whether the author exists


### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 405 to be one of [ 200, 400 ]

Hints:
- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client


### GET `/api/articles?order=not-asc-or-desc`

Assertion: expected 405 to be one of [ 200, 400 ]

Hints:
- filter out invalid `order` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles in the default order _OR_ use a 400 and provide a useful message to the client
 -->

### GET `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the article to the client in an object, with a key of `article`: `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

### GET `/api/articles/2`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default the vote column to `0` in the migration
- article with article_id 2 has no comments, you may need to check your join

### GET `/api/articles/1`

Assertion: expected undefined to equal '13'

Hints:

- ensure you have calculated a comment_count for the article

### PUT `/api/articles/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PATCH `/api/articles/1`

Assertion: expected 101 to equal 100

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

<!-- NOT COMPLETED YET

### GET `/api/articles/1/comments`

Assertion: expected 404 to equal 200

Hints:

- use a 200: OK status code for a successful `GET` request

### GET `/api/articles/1/comments`

Assertion: expected undefined to be an array

Hints:

- send comments in an array, with a key of `comments`

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- each comment does not need a key of `article_id`
- use the data from the `test-data` in your tests

### GET `/api/articles/1/comments`

Assertion: Cannot read property '0' of undefined

Hints:

- sort comments by `created_at` by default
- order should default to `DESC`

### GET `/api/articles/1/comments?sort_by=votes`

Assertion: Cannot read property '0' of undefined

Hints:

- accept a `sort_by` query of any valid column
- order should default to `DESC`

### GET `/api/articles/1/comments?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- accept an `order` query of `asc` or `desc`
- `sort_by` should default to `created_at`

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

### GET `/api/articles/not-a-valid-id/comments`

Assertion: expected 404 to equal 400

Hints:

- return 400: Bad Request when given an invalid `article_id`

### GET `/api/articles/1/comments?order=not-a-valid-order`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `order` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles in the default order _OR_ use a 400 and provide a useful message to the client

### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### PUT `/api/articles/1/comments`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### POST `/api/articles/1/comments`

Assertion: expected 404 to equal 201

Hints:

- use a 201: Created status code for a successful `POST` request

### POST `/api/articles/1/comments`

Assertion: expected { msg: 'Resource not found' } to contain key 'comment'

Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README

### POST `/api/articles/1/comments`

Assertion: Cannot read property 'votes' of undefined

Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### POST `/api/articles/1/comments`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### POST `/api/articles/not-a-valid-id/comments`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request when `POST` contains an invalid article_id

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/comments/1`

Assertion: expected { msg: 'Resource not found' } to contain key 'comment'

Hints:

- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`

### PATCH `/api/comments/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body

### PATCH `/api/comments/not-a-valid-id`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request when `PATCH` contains an invalid comment_id

### PATCH `/api/comments/1`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value

### PUT `/api/comments/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### DELETE `/api/comments/1`

Assertion: expected 404 to equal 204

Hints:

- use a 204: No Content status code
- do not return anything on the body

### DELETE `/api/comments/not-a-number`

Assertion: expected 404 to equal 400

Hints:

- use a 400: Bad Request when `DELETE` contains an invalid comment_id -->

### GET `/api/users/butter_bridge`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the user to the client in an object, with a key of `user`: `{ user: {} }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

### PUT `/api/users/butter_bridge`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### DELETE `/api`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code
