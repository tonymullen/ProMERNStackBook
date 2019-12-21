const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';
// See scripts/init.mongo.js for Atlas and mLab URLs

let db;
let aboutMessage = "Issue Tracker API v1.0";


const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL is a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value
        }
    },
});

async function issueList() {
    // return issuesDB;
    const issues = await db.collection('issues')
        .find({}).toArray();
    return issues;
}


async function connectToDb() {
    const client = new MongoClient(url, {
        useNewUrlParser: true
    });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
}

(async function() {
    try {
        await connectToDb();
        app.listen(3000, function(){
            console.log('App started on port 3000');
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();


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


function validateIssue(issue) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('Field "Owner" is required when status is "Assigned');
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

function issueAdd(_, { issue }) {
    validateIssue(issue);
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issuesDB.push(issue);
    return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
});

const app = express();
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

