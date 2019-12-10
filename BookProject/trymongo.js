const url = 'mongodb://localhost:27017/issuetracker'
const { MongoClient } = require('mongodb')


function testWithCallbacks(callback) {
    console.log('\n--- testWithCallbacks ---');
    const client = new MongoClient(url, {useNewUrlParser: true});

    client.connect(function(err, client) {
        if (err) {
            callback(err);
            return;
        }
        const db = client.db();
        const collection = db.collection('employees');
        const employee = { id: 1.0, name: 'G. Callback', age: 55 };
        collection.insertOne(employee, function(err, result) {
            if (err) {
                client.close();
                callback(err);
                return;
            }
            console.log('Result of insert:\n', result.insertedId);

            collection.find({_id:  result.insertedId})
            .toArray(function(err, docs) {
                if (err) {
                    client.close();
                    callback(err);
                    return;
                }
                console.log('Result of find:\n', docs);
                client.close();
                callback(err)
            });
        });
    });
}

testWithCallbacks(function(err) {
    if (err) {
        console.log(err);
    }
})