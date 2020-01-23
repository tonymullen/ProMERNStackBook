const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url =  process.env.DB_URL || 'mongodb://localhost/issuetracker';
const port = process.env.API_SERVER_PORT || 3000;

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

async function getNextSequence(name) {
    const result = await db.collection('counters')
        .findOneAndUpdate(
            { _id: name },
            { $inc: { current: 1 } },
            { returnOriginal: false },
        );
        return result.value.current;
}

async function issueAdd(_, { issue }) {
    const errors = [];
    validateIssue(issue);
    issue.created = new Date();
    issue.id = await getNextSequence('issues');

    const result = await db.collection('issues').insertOne(issue);

    const savedIssue = await db.collection('issues')
        .findOne({ _id: result.insertedId });

    return savedIssue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
});

const app = express();

server.applyMiddleware({ app, path: '/graphql' });

(async function() {
    try {
        await connectToDb();
        app.listen(port, function(){
            console.log(`AppAPI server started on port ${port}`);
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();