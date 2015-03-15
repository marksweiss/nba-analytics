aws = require('aws-sdk');
db = new aws.DynamoDB();

var params = {
    TableName: 'games',
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        { // Required HASH type attribute
            AttributeName: 'h_team_a_team_date',
            AttributeType: 'S',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'game_date', 
            AttributeType: 'S', 
        },
        {
            AttributeName: 'h_team_name',
            AttributeType: 'S',
        },
        {
            AttributeName: 'a_team_name',
            AttributeType: 'S',
        },
        {
            // "BOOL" value of 0|1
            AttributeName: 'h_team_won',
            AttributeType: 'N',
        },
        {
            // "BOOL" value of 0|1
            AttributeName: 'a_team_won',
            AttributeType: 'N',
        },        
    ],
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
          // Concat home team abbrev, away team abbrev, date
          // Unique as long as two teams don't play twice on same day
            AttributeName: 'h_team_a_team_date',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
          // Range is date so we can query by any time range
            AttributeName: 'game_date', 
            KeyType: 'RANGE', 
        }
    ],
    GlobalSecondaryIndexes: [
        { 
            IndexName: 'game_date_GIDX',
            KeySchema: [ 
                { // Required HASH type attribute - must match the table's HASH key attribute name
                    AttributeName: 'game_date',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // required
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
                /*NonKeyAttributes: [ // required / allowed only for INCLUDE
                    'attribute_name_1',
                    // ... more attribute names ...
                ],*/
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },            
        },
        { 
            IndexName: 'h_team_name_GIDX',
            KeySchema: [ 
                { 
                    AttributeName: 'h_team_name',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // required
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },            
        },
        { 
            IndexName: 'a_team_name_GIDX',
            KeySchema: [
                {
                    AttributeName: 'a_team_name',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // required
                ProjectionType: 'ALL' // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },            
        },
        { 
            IndexName: 'h_team_won_GIDX',
            KeySchema: [
                {
                    AttributeName: 'h_team_won',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // required
                ProjectionType: 'ALL' // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },            
        },
        { 
            IndexName: 'a_team_won_GIDX',
            KeySchema: [
                {
                    AttributeName: 'a_team_won',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // required
                ProjectionType: 'ALL' // (ALL | KEYS_ONLY | INCLUDE)
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },            
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1, 
    }
};
db.createTable(params, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});


db.deleteTable({TableName: 'games'}, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});


db.listTables({}, function(err, data) {
    if (err) console.log(err); // an error occurred
    else console.log(data); // successful response

});


var item = {
    TableName: 'games',
    Item: {
        h_team_a_team_date: {S: "CHI_CLE_1985-10-25T00:00:00.000-0400"},
        game_date: {S: "1985-10-25T00:00:00.000-0400"},
        h_team_name: {S: 'Chicago Bulls'},
        a_team_name: {S: 'Cleveland Cavaliers'},
        h_team_won: {N: '1'},
        a_team_won: {N: '0'},
        h_team_points: {N: '116'},
        a_team_points: {N: '115'},
        h_team_assists: {N: '29'},
        a_team_assists: {N: '24'},
        h_team_blocks: {N: '8'},
        a_team_blocks: {N: '8'},
        h_team_defensive_rebounds: {N: '32'},
        a_team_defensive_rebounds: {N: '31'},
        h_team_field_goals: {N: '43'},
        a_team_field_goals: {N: '45'},
        h_team_three_point_field_goals: {N: '1'},
        a_team_three_point_field_goals: {N: '2'},
        h_team_field_goal_attempts: {N: '95'},
        a_team_field_goal_attempts: {N: '93'},
        h_team_three_point_field_goal_attempts: {N: '4'},
        a_team_three_point_field_goal_attempts: {N: '3'},
        h_team_free_throws: {N: '29'},
        a_team_free_throws: {N: '32'},
        h_team_free_throws: {N: '29'},
        a_team_free_throws: {N: '23'},
        h_team_free_throw_attempts: {N: '41'},
        a_team_free_throw_attempts: {N: '32'},
        h_team_offensive_rebounds: {N: '21'},
        a_team_offensive_rebounds: {N: '16'},
        h_team_personal_fouls: {N: '33'},
        a_team_personal_fouls: {N: '34'},
        h_team_steals: {N: '8'},
        a_team_steals: {N: '8'},
        h_team_turnovers: {N: '20'},
        a_team_turnovers: {N: '20'}
    },
    ReturnValues: "NONE", // optional (NONE | ALL_OLD)
    ReturnConsumedCapacity: "NONE", // optional (NONE | TOTAL | INDEXES)
    ReturnItemCollectionMetrics: "NONE" // optional (NONE | SIZE)
};
db.putItem(item, function(err, data) {
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


// Query Use Cases

// Query for exact game
//  @param - h_team_a_team_date, String, concat of home-team abbrev, away-team abbrev 
//   and date of game in ISO-8601
//  @param - game_date, String, date of game in ISO-8601
var params = {
    TableName: 'games',
    Key: {
        h_team_a_team_date: {S: "ATL_WSB_1985-10-25T00:00:00.000-0400"},
        game_date: {S: "1985-10-25T00:00:00.000-0400"}
    }
};
db.getItem(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all games on a given 'game_date'
// @param, game_date, String, date of game in ISO-8601
var params = {
    TableName: 'games',
    IndexName: 'game_date_GIDX',
    KeyConditions: {
        game_date: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: "1985-10-25T00:00:00.000-0400"}
            ]
        }
    },
    // ProjectionExpression: "A, B"
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}}); 

// Query for all home games for a team TODO Add date range key
// @param - h_team_name, String, full name of home team
var params = {
    TableName: 'games',
    IndexName: 'h_team_name_GIDX',
    KeyConditions: {
        h_team_name: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: 'Atlanta Hawks'}
            ]
        }
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all away games for a team TODO Add date range key
// @param - a_team_name, String, full name of away team
var params = {
    TableName: 'games',
    IndexName: 'a_team_name_GIDX',
    KeyConditions: {
        a_team_name: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: 'Washington Bullets'}
            ]
        }
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

