# Pro MERN Stack book notes

## Chapter 13

This chapter adds some further functionality to the application. This includes refactoring the toast code to take advantage of the composition pattern rather than inheritance, exploring some advanced Mongo querying to generate a pivot table for reporting purposes, setting up paginated display for larger numbers of issues, setting up undo functionality for issue deletion, and implementing text-based search functionality.

For your Chapter 13 screenshots, please include a screenshot of the issues list page and the report page, as shown below. Your issues list page should also show pagination and search in action as shown below.

![ch13_1](/readme_images/Ch13_1.png)

![ch13_2](/readme_images/Ch13_2.png)


### Chapter 13 notes and errors:

* On page 436, the template string `'Lorem ipsum dolor sit amet, ${i}'` needs to be surrounded by backticks rather than single quotes: ```Lorem ipsum dolor sit amet, ${i}```
* The random issue creator script on page 436 assigns an integer id number to each issue that must be unique, which is calculated to begin from the number of issues currently in the database. If somehow your database got into a state where there are existing issues with id values that are numerically higher than the total number of issues in the database, this script will crash and fail to add 100 new issues. You'll have to fix these issue IDs manually or delete those issues.
* On page 467, the line `history.push('/edit/${value}');` should use backticks instead of single quotes. The correct code is ``history.push(`/edit/${value}`);``


## Chapter 12

In this chapter we look at server-side rendering. Server side rendering generates the completed HTML source on the server and sends it to the browser. This is analagous to classic web-server architectures, before the days of "single page applications" where the DOM is mostly generated by JavaScript library code in the browser. The benefit of server-side rendering is that it produces client HTML that is better suited for search engine indexing. If you want your page to be findable by Google, you have to make sure that it can be correctly indexed.

Chapter 12 will show you how to combine server-side rendering with client side rendering in a way that optimizes the advantages of both.

Making sure that the data rendered on the UI server is consistent with the data rendered by the client is the primary complicating factor in this chapter. Both must share data that has been retrieved by the API.

For your screenshots, please include a shot of the *page source* for the Issues List page with a detail issue selected displayed in the browser as shown below. Note that the table HTML is populated by actual issue data, including the selected issue's description, which is highlighlighted in my screenshot.

![ch12](/readme_images/Ch12_page_source_highlighted.png)

### Chapter 12 notes and errors:

* On page 378 in listing 12-1 the second to last right curly bracket shown should also have a strikethrough line through it (i.e. needs deleting).
* On page 379 in Listing 12-3, `rules` needs to be in quotes: `"rules"`. The same errorr occurs in listing 12-2, but is less of an issue since it deals with existing code.
* In Listing 12-3 on page 379, the terms `error` and `always` should be in double, not single quotes, and `ignorePackages` should also be in double quotes.
* A small inconsistency from earlier in the book rears its head again. The `id` value in the template (page 398) is listed in the text as `contents`. In my `App.jsx` I have the element to be rendered/hydrated identified as `content`. If these are not the same, the code will not work properly. I suggest going with whatever you have/had in your original `index.html`.
* On page 403, Listing 12-33 indicates the file to edit is `ui/src/render.jsx`. In fact, `render.jsx` is (and should be) located in `ui/server/`.
* On page 401, the code

        if (!process.env.UI_SERVER_API_ENDPOINT) {
            process.env.UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
        }

    is incorrect. It should read:

        if (!process.env.UI_SERVER_API_ENDPOINT) {
            process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
        }

    That is, the assigned environment variable name is missing the substring `SERVER`. If this is not correctly set, you will not have the results described at the bottom of page 403.
* Not an error, but a slight clarification. On page 408, the text states "For example, when you refresh the page /issues you will see that the table header is present, but the table itself is not populated with issues." This is referring to the *page source*, not the displayed DOM. To see the missing data, right click on the page and choose "View Page Source". In that HTML, you should see that the table is not populated by data, because the populating is happening on the client side under React.
* As of 3/4/2020 GitHub is reporting a security alert on the version of `serialize-javascript` used by the book.



## Chapter 11

In this chapter we look at React-Bootstrap, a UI framework that abstracts away from CSS to enable us to easily create professional looking interfaces with minimal visual design skills and knowledge. The CSS (and some JavaScript) is included with the Bootstrap files that we add to our project, and we use readymade components and class labels to determine the UI characteristics of our page.

For your screenshot, please include the Create Issue modal as shown:

![ch11](/readme_images/Ch11.png)

### Chapter 11 notes and errors:

* On page 329, with the addition of the Grid components, the code in listing 11-8 omits ellipses (`...`) in the `Page()` function that are usually used in the text to indicate code you don't touch. You need to keep the `NavBar` and `Footer` components as they were, so the function should look like this:

        export default function Page() {
          return (
            <div>
              <NavBar />
              <Grid>
                <Contents />
              </Grid>
              <Footer />
            </div>
          );
        }

* On page 337, the crossed-out code to be deleted includes the lines

        <option value="">(All)</option>
        ...

    In fact, this code should be maintained, including the ellided code. If you deleted the code before the `</select>` label you will need to replace it.

* On page 373, the changes to `IssueList.jsx` should include deleting the line

        this.createIssue = this.createIssue.bind(this);

    However, it appears that the book omits a strike-through line in the code displayed here.


## Chapter 10

In this chapter we look at React forms that enable the application to be aware of user input and update its state in real time.

Include 2 screenshots in your readme entry for this chapter. One of the top page list, and one of the edit page, as shown below:

![ch10](/readme_images/ch10_1.png)

![ch10](/readme_images/ch10_2.png)


### Chapter 10 notes and errors:

* On page 269 about a third of the way down the page in the fifth line of code displayed, there is a typographical error. A pair of single quotes is incorrectly displayed as a single double-quote character. This should be a pair of single quotes representing an empty string, like this:

        status: params.get('status') || '',

* The same issue occurs near the top of page 270. The correct code is:

        search: status ? `?status=${status}` : '',

* The issue repeats a few times more in this chapter. Be aware that any appearance of a print-typograpic style open double quote character should be an empty string.

* On page 306, the text reads "Next we'll connect the API to its resolver within `issue.js` in the API handler." The resolver can be found in thee file `api_handler.js` as indicated in the caption for Listing 10-22.

## Chapter 9

In this chapter we set up routing for a single page application using React's router component. In particular we implement a description display that will be shown when an individual issue is selected.

Your screenshot from this chapter should show this functionality in action, like this:

![ch8](/readme_images/ch09.png)

### Chapter 9 notes and errors:

* On page 255, the book states that you should be able to test the API in GraphQL playground, but does not include a reminder how to do that. To test this, go to `localhost:3000/graphql/` and enter

        query issue($id: Int!) {
            issue (id: $id) {
                id description
            }
        }

    in the query window (upper left text area). In the "Query Variables" window below, you must enter

        { "id": 1 }

    (Or whatever actual ID number corresponds to the issue you wish to retrieve.)

## Chapter 8

Chapter 8 continues restructuring the application in a way that is more scalable and maintainable. We do this by breaking the UI code out of App.jsx and into separate files for individual components, and loading these files as modules. This will make a complex project much easier to navigate.

In addition to breaking the code into modules, Chapter 8 also introduces webpack, a tool for module bundling and deployment.

In your readme screenshot for Chapter 8, include the browser console. It should be displaying the Webpack Hot Module Replacement logging as shown here:

![ch8](/readme_images/ch08.png)

### Chapter 8 notes and errors:

* At the end of page 204 the author foreshadows a change that you will make in `server.js`. Be aware that the actual line you'll add is a bit different than what's shown here, as the `graphql_date.js` actually needs to be `./graphql_date.js`. The correct change is given on page 206.
* On page 227, the line `devtool: 'source-map'` will raise an ESLint error if there is not a trailing comma at the end.

## Chapter 7

In Chapter 7 we began to structure the project in a more appropriate way to a scalable client/server application, essentially breaking the project into an API server and a separate UI server, each of which we're treating as independent, loosely coupled applications in their own right.

The second half of the chapter introduces the linter we'll use, ESLint, which will help us enforce good coding style. We'll make a number of changes to the code so far to conform to best current JS practices, including using the `=>` operator consistently for anonymous functions and using "destructuring" to streamline references to object attributes.

In your own readme update for chapter 7, include screenshots from your own environment that correspond to the following, showing clean linter runs on both the API and UI side:

![ch7](/readme_images/ch07_1.png)

![ch7](/readme_images/ch07_2.png)

### Chapter 7 notes and errors:

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

### Chapter 6 notes and errors:

* Installing MongoDB is straightforward and instructions can be found [here](https://docs.mongodb.com/manual/administration/install-community/). However, a step that people frequently overlook is to create the '/data/db' directories in your computer's root directory. That step is described [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#create-database-directory) for Windows but may also be necessary for OS X, depending on how you install MongoDB.
* Your MongoDB server is launched with the `mongod` command, and should always be running whenever you wish to use the database. Note that this is not the `mongo` command, which you use to run the client to communicate with the database.
* Several nice GUI interfaces are available for working with MongoDB, and I highly recommend you use one. My favorite is [Robo3T](https://robomongo.org/).


## Chapter 5

This chapter goes into some slightly more advanced topics of server side request handling. Express is the web server framework build on top of Node, and GraphQL is an query language used to describe requests from a web client to a web server. GraphQL is distinguished from the traditional REST (REpresentative State Transfer) paradigm of web communication.

### Chapter 5 notes and errors:

* GraphQL queries are very sensitive to correct syntax. Careful of double vs single quotes, be sure to include any "!" etc. specified in the the schema in your query or the request will fail.
* The function shown as `validateIssue(_, { issue })` on the bottom of page 123 and on page 125 is incorrectly named and has the wrong parameters. It should be `issueValidate(issue)` as called at the top of page 126.

## Chapter 4

This chapter introduces React's approach to handling model information using state and properties.

### Chapter 4 notes and errors

No issues noted so far.

## Chapter 3

This chapter introduces the building blocks of a React app, components.

### Chapter 3 notes and errors:

* Listing 3-6 on page 55 is missing a single quote before "New".

## Chapter 2

This chapter gives an intro to server-side development with Node and NPM.

### Chapter 2 notes and errors:

* Running your application for development will involve running `npm start` in one terminal (to launch the server) and for continuous building you'll run `npm run watch` in a separate terminal. Running `npm run compile` should be done before remote deployment, or your latest changes will not be deployed.
* The description of the HTML on page 17 is cursory and assumes you know the basics of HTML, but listing 2-1 includes the full HTML necessary to get started.
* Listing 2-1 has the div id as "contents". It should be "content" to go with the rest of the code described.
* The author often starts talking about code and only later tells you exactly where to put it. This seems to be a deliberate stylistic choice and is continued throughout the book. Keep reading and it should become clear where the code goes (in this case on page 28).
