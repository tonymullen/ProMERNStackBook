# Pro MERN Stack book notes

## Chapter 7

In Chapter 7 we began to structure the project in a more appropriate way to a scalable client/server application, essentially breaking the project into an API server and a separate UI server, each of which we're treating as independent, loosely coupled applications in their own right.

The second half of the chapter introduces the linter we'll use, ESLint, which will help us enforce good coding style. We'll make a number of changes to the code so far to conform to best current JS practices, including using the `=>` operator consistently for anonymous functions and using "destructuring" to streamline references to object attributes.

In your own readme update for chapter 7, include screenshots from your own environment that correspond to the following, showing clean linter runs on both the API and UI side:

![ch7](/readme_images/ch07_1.png)

![ch7](/readme_images/ch07_2.png)

Notes and errors:

* For UI eslint corrections, on page 198, the line:

        function IssueTable({ issue }) {

    Has an error. It should be

        function IssueTable({ issues }) {

* For API eslint corrections, on page 193, the following lines:

        errors.push('Field "title" must be at least 3 characters long.');

    and

        if (issue.status === 'Assigned' && !issue.owner) {

    appear to be attributed to the `issueAdd` function. In fact, they are in the body of the `issueValidate` function. Refer to my code in this repository or to the author's code in the book's GitHub repository to confirm where these lines of code belong.
* The book (and the authors code on GitHub) both have the `.eslintrc` file containing the line:

        "node": "true"

    I've found that eslint complains that the `"true"` value should be a boolean, `true`. You can get rid of this warning by making this change.

## Chapter 6

This chapter introduces MongoDB. Interacting with the database using the  `mongo` shell and a script-based interface are dealt with.

Notes and errors:

* Installing MongoDB is straightforward and instructions can be found [here][https://docs.mongodb.com/manual/administration/install-community/]. However, a step that people frequently overlook is to create the '/data/db' directories in your computer's root directory. That step is described [here][https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#create-database-directory] for Windows but may also be necessary for OS X, depending on how you install MongoDB.
* Your MongoDB server is launched with the `mongod` command, and should always be running whenever you wish to use the database. Note that this is not the `mongo` command, which you use to run the client to communicate with the database.
* Several nice GUI interfaces are available for working with MongoDB, and I highly recommend you use one. My favorite is [Robo3T][https://robomongo.org/].


## Chapter 5

This chapter goes into some slightly more advanced topics of server side request handling. Express is the web server framework build on top of Node, and GraphQL is an query language used to describe requests from a web client to a web server. GraphQL is distinguished from the traditional REST (REpresentative State Transfer) paradigm of web communication.

Notes and errors:

* GraphQL queries are very sensitive to correct syntax. Careful of double vs single quotes, be sure to include any "!" etc. specified in the the schema in your query or the request will fail.
* The function shown as `validateIssue(_, { issue })` on the bottom of page 123 and on page 125 is incorrectly named and has the wrong parameters. It should be `issueValidate(issue)` as called at the top of page 126.

## Chapter 4

This chapter introduces React's approach to handling model information using state and properties.

Notes and errors:


## Chapter 3

This chapter introduces the building blocks of a React app, components.

Notes and errors:

* Listing 3-6 on page 55 is missing a single quote before "New".

## Chapter 2

This chapter gives an intro to server-side development with Node and NPM.

Notes and errors:

* Running your application for development will involve running `npm start` in one terminal (to launch the server) and for continuous building you'll run `npm run watch` in a separate terminal. Running `npm run compile` should be done before remote deployment, or your latest changes will not be deployed.
* The description of the HTML on page 17 is cursory and assumes you know the basics of HTML, but listing 2-1 includes the full HTML necessary to get started.
* Listing 2-1 has the div id as "contents". It should be "content" to go with the rest of the code described.
* The author often starts talking about code and only later tells you where to put it. This seems to be a deliberate stylistic choice. Keep reading and it should become clear where the code goes (in this case on page 28).
