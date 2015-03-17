aws = require('aws-sdk');
db = new aws.DynamoDB();

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

// Query for all home games for a team
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

// Query for all home games for a team on a given date
// @param - h_team_name, String, full name of home team
// @param - game_date, String, date of game 
var params = {
    TableName: 'games',
    IndexName: 'h_team_name_GIDX',
    KeyConditions: {
        h_team_name: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: 'Atlanta Hawks'}
            ]
        },
        game_date: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: "1985-10-25T00:00:00.000-0400"}
            ]
        }
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all home games for a team in a given date range 
// @param - h_team_name, String, full name of home team
// @param - game_date begin, String, date of game at start of range 
// @param - game_date end, String, date of game at end of range 
var params = {
    TableName: 'games',
    IndexName: 'h_team_name_GIDX',
    KeyConditions: {
        h_team_name: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: 'Atlanta Hawks'}
            ]
        },
        game_date: {
            ComparisonOperator: 'BETWEEN',
            AttributeValueList: [
                {S: "1985-10-25T00:00:00.000-0400"},
                {S: "1985-10-25T00:00:00.000-0400"}
            ]
        }
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all away games for a team
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

// Query for all home game wins
// @param - h_team_won, String, full name of away team
var params = {
    TableName: 'games',
    IndexName: 'h_team_won_GIDX',
    KeyConditions: {
        h_team_won: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {N: '1'}
            ]
        }
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all away game wins
// @param - a_team_won, String, full name of away team
var params = {
    TableName: 'games',
    IndexName: 'a_team_won_GIDX',
    KeyConditions: {
        a_team_won: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {N: '1'}
            ]
        }
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all home game wins by a home team
// @param - h_team_won, String, 1 indcating team won, 0 indicating team lost
// @param - h_team_name, String, full team name
var params = {
    TableName: 'games',
    IndexName: 'h_team_won_GIDX',
    KeyConditions: {
        h_team_won: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {N: '1'}
            ]
        },
        h_team_name: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {S: 'Washington Bullets'}
            ]
        } 
    },
    ScanIndexForward: false
};
db.query(params, function(err, data) {if (err) {console.log(err);} else {console.log(JSON.stringify(data));}});

// Query for all away game wins
// @param - a_team_won, String, 1 indcating team won, 0 indicating team lost
// @param - a_team_name, String, full team name
var params = {
    TableName: 'games',
    IndexName: 'a_team_won_GIDX',
    KeyConditions: {
        a_team_won: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [
                {N: '1'}
            ]
        },
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


