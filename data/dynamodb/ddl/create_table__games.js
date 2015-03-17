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
                },
                {
                    AttributeName: 'game_date',
                    KeyType: 'RANGE',
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
                },
                {
                    AttributeName: 'game_date',
                    KeyType: 'RANGE',
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
                },
                {
                    AttributeName: 'h_team_name',
                    KeyType: 'RANGE',
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
                },
                {
                    AttributeName: 'a_team_name',
                    KeyType: 'RANGE',
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

