/*
// This is the input data strucure, on record from the source dataset scrapted from nba.com
// I have removed the individual player stat data from this example, since we're not using it
{
  "teams": [
    {
      "won": 1,
      "home": false,
      "score": 100,
      "abbreviation": "WSB",
      "name": "Washington Bullets"
    },
    {
      "won": 0,
      "home": true,
      "score": 91,
      "abbreviation": "ATL",
      "name": "Atlanta Hawks"
    }
  ],
  "date": {
    "$date": "1985-10-25T00:00:00.000-0400"
  },
  "box": [
    {
      "won": 1,
      "team": {
        "trb": 40,
        "tov": 17,
        "stl": 11,
        "fg_pct": ".513",
        "fg3a": 2,
        "fg3_pct": ".000",
        "fg3": 0,
        "fg": 40,
        "drb": 29,
        "blk": 7,
        "ast": 21,
        "fga": 78,
        "ft": 20,
        "ft_pct": ".769",
        "fta": 26,
        "mp": 240,
        "orb": 11,
        "pf": 19,
        "pts": 100
      },
      "players": [
      ]
    },
    {
      "won": 0,
      "team": {
        "trb": 44,
        "tov": 16,
        "stl": 8,
        "fg_pct": ".446",
        "fg3a": 3,
        "fg3_pct": ".000",
        "fg3": 0,
        "fg": 41,
        "drb": 28,
        "blk": 5,
        "ast": 25,
        "fga": 92,
        "ft": 9,
        "ft_pct": ".500",
        "fta": 18,
        "mp": 240,
        "orb": 16,
        "pf": 23,
        "pts": 91
      },
      "players": [
      ]
    }
  ],
  "_id": {
    "$oid": "52f29f91ddbd75540aba6dae"
  }
}
*/

/*
// This is the object structure for the input data as an Item loaded into DynamoDB
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
    }
};
*/

var lazy = require('lazy.js');
var aws = require('aws-sdk');

var PATH = '/Users/markweiss/Dropbox/projects/nba-analytics/games_one_record_one_line.txt';
var DDB_TABLE = 'games';


function configureDdbConn(ddb){
    ddb.config.endpoint = 'localhost';
    ddb.endpoint.protocol = 'http';
    ddb.endpoint.host = 'localhost';
    ddb.endpoint.port = 8000;
    ddb.endpoint.hostname = 'localhost';
    ddb.endpoint.pathname = '/';
    ddb.endpoint.path = '/';
    ddb.endpoint.href = 'http://localhost/';
    ddb.config.region = 'us-east-1';

    return ddb;
}


function loadItemToDdb(ddb, table, item) {
    var data = {
        TableName: 'games',
        Item: item
    }  
   
    ddb.putItem(data, function(err, data) {
        if (err) {
            console.log(err);
            console.log(data);
        }
    });
};


function transformLineToItem(line) {
    var item = {};
    
    // Get game_date, range key in DDB
    var line = JSON.parse(line);
    var game_date = line['date']['$date']; 
    item.game_date = {'S': game_date};
    
    var lt = line['teams'];  
    var homeIdx = lt[0]['home'] ? 0 : 1;
    var awayIdx = (homeIdx === 1 ? 0 : 1);
    // Get team abbrevs and construct DDB primary key, concatenation of 
    //  each team's abbrev and the game date, which is an informative key and unique
    //  unless two teams play twice in the same day, which "should" never happen
    var homeAbbrev = lt[homeIdx]['abbreviation'];
    var awayAbbrev = lt[awayIdx]['abbreviation'];
    item.h_team_a_team_date = {'S': homeAbbrev + '_' + awayAbbrev + '_' + game_date};
  
    // Get team full names
    item.h_team_name = {'S': lt[homeIdx]['name']};
    item.a_team_name = {'S': lt[awayIdx]['name']};

    // Get which team won
    item.h_team_won = {'N': (lt[homeIdx]['won'] ? 1 : 0) + ''};
    item.a_team_won = {'N': (lt[awayIdx]['won'] ? 1 : 0) + ''};

    // Get the rest of the team stats. These are attributes in the DDB record.
    var teams = [];
    teams[0] = line['box'][0]['team'];
    teams[1] = line['box'][1]['team'];
    // This is a mapping of the source data abbreviations for the team statistics
    //  to more informative non-abbreviated words in the DDB record.
    var statName = {
        "tov":  "turnovers",
        "stl":  "steals",
        "fg3a": "three_point_field_goal_attempts",
        "fg3":  "three_point_field_goals",
        "fg":   "field_goals",
        "drb":  "defensive_rebounds",
        "blk":  "blocks",
        "ast":  "assists",
        "fga":  "field_goal_attempts",
        "ft":   "free_throws",
        "fta":  "free_throw_attempts",
        "orb":  "offensive_rebounds",
        "pf":   "personal_fouls",
        "pts":  "points"
    };
    var homeAwayIdxs = [homeIdx, awayIdx];
    for (i = 0; i < 2; ++i) {
        var idx = homeAwayIdxs[i];
        var team = teams[idx] 
        var prefix = (idx === homeIdx ? 'h_team_' : 'a_team_');
        for (stat in team) {
            if (statName[stat] !== undefined) {
                item[prefix + statName[stat]] = {'N': team[stat] + ''};
            }
        }
    }


    // TEMP DEBUG
    console.log(item);

    return item;
}


// NOTE: Depends on the following:
// 1) DynamoDB local installed
// 2) 'games' table created according to script in 'scripts_ddb.js'
// 3) ~/.aws/credentials file accessible like so:
//   [default]
//   aws_access_key_id=AKIAIOSFODNN7EXAMPLE
//   aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
//
// 4) ~/.aws/config file accessible like so:
//   [default]
//   region=us-east-1
//   output=json
// 5) games.txt file is found at the location in 'PATH' var at top of this source file

// Read in each line of input from its input format
(function main() {
    try {
        var ddb = new aws.DynamoDB();
        ddb = configureDdbConn(ddb);

        lazy.readFile(PATH)
            .lines()
            .each(function(line) {

                // TEMP DEBUG
                console.log(line);

                loadItemToDdb(ddb, DDB_TABLE, transformLineToItem(line));
            });
    }
    catch (err) {
        console.log(err);
    }
})();

