aws = require('aws-sdk');
db = new aws.DynamoDB();

db.deleteTable({TableName: 'games'}, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});


db.listTables({}, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});

var params = {
    TableName: 'games',
};
db.describeTable(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response
});

