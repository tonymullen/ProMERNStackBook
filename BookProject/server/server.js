const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL is a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        console.log("parseLiteral")
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    }
});

let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2019-01-15'), due: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Addigned', owner: 'Eddie', effort: 14,
        created: new Date('2019-01-16'), due: new Date('2019-02-01'),
        title: 'Missing bottom border on panel',
    },
]

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate,
};

// resolver functions have a fixed structure:
// fieldname(obj, args, context, info)
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

function issueAdd(_, { issue }) {
    console.log("issueAdd")
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issuesDB.push(issue);
    return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

const app = express();
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function() {
    console.log('App started on port 3000');
});
