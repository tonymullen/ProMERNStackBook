# Pro MERN Stack book notes

## Chapter 7

## Chapter 6

This chapter introduces MongoDB. Interacting with the database using the  `mongo` shell and a script-based interface are dealt with.

Notes:

* Installing MongoDB is straightforward and instructions can be found [here][https://docs.mongodb.com/manual/administration/install-community/]. However, a step that people frequently overlook is to create the '/data/db' directories in your computer's root directory. That step is described [here][https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#create-database-directory] for Windows but may also be necessary for OS X, depending on how you install MongoDB.
* Your MongoDB server is launched with the `mongod` command, and should always be running whenever you wish to use the database. Note that this is not the `mongo` command, which you use to run the client to communicate with the database.
* Several nice GUI interfaces are available for working with MongoDB, and I highly recommend you use one. My favorite is [Robo3T][https://robomongo.org/].


## Chapter 5

This chapter goes into some slightly more advanced topics of server side request handling. Express is the web server framework build on top of Node, and GraphQL is an query language used to describe requests from a web client to a web server. GraphQL is distinguished from the traditional REST (REpresentative State Transfer) paradigm of web communication.

Notes:

* GraphQL queries are very sensitive to correct syntax. Careful of double vs single quotes, be sure to include any "!" etc. specified in the the schema in your query or the request will fail.
* The function shown as `validateIssue(_, { issue })` on the bottom of page 123 and on page 125 is incorrectly named and has the wrong parameters. It should be `issueValidate(issue)` as called at the top of page 126.

## Chapter 4

This chapter introduces React's approach to handling model information using state and properties.

Notes:


## Chapter 3

This chapter introduces the building blocks of a React app, components.

Notes:

* Listing 3-6 on page 55 is missing a single quote before "New".

## Chapter 2

This chapter gives an intro to server-side development with Node and NPM.

Notes:

* Running your application for development will involve running `npm start` in one terminal (to launch the server) and for continuous building you'll run `npm run watch` in a separate terminal. Running `npm run compile` should be done before remote deployment, or your latest changes will not be deployed.
* The description of the HTML on page 17 is cursory and assumes you know the basics of HTML, but listing 2-1 includes the full HTML necessary to get started.
* Listing 2-1 has the div id as "contents". It should be "content" to go with the rest of the code described.
* The author often starts talking about code and only later tells you where to put it. This seems to be a deliberate stylistic choice. Keep reading and it should become clear where the code goes (in this case on page 28).
