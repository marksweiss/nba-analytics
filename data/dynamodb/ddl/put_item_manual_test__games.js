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

