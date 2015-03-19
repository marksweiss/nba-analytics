USE nba_analytics;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
    h_team_a_team_date CHAR(37) NOT NULL,
    game_date DATE NOT NULL,
    h_team_name VARCHAR(64) NOT NULL, 
    a_team_name VARCHAR(64) NOT NULL,
    h_team_won SMALLINT NOT NULL,
    a_team_won SMALLINT NOT NULL,
    h_team_turnovers SMALLINT NOT NULL,
    a_team_turnovers SMALLINT NOT NULL,
    h_team_steals SMALLINT NOT NULL,
    a_team_steals SMALLINT NOT NULL,
    h_team_three_point_field_goal_attempts SMALLINT NOT NULL,
    a_team_three_point_field_goal_attempts SMALLINT NOT NULL,
    h_team_field_goals SMALLINT NOT NULL,
    a_team_field_goals SMALLINT NOT NULL,
    h_team_blocks SMALLINT NOT NULL,
    a_team_blocks SMALLINT NOT NULL,
    h_team_assists SMALLINT NOT NULL,
    a_team_assists SMALLINT NOT NULL,
    h_team_field_goal_attempts SMALLINT NOT NULL,
    a_team_field_goal_attempts SMALLINT NOT NULL,
    h_team_free_throws SMALLINT NOT NULL,
    a_team_free_throws SMALLINT NOT NULL,
    h_team_free_throw_attempts SMALLINT NOT NULL,
    a_team_free_throw_attempts SMALLINT NOT NULL,
    h_team_defensive_rebounds SMALLINT NOT NULL,
    a_team_defensive_rebounds SMALLINT NOT NULL,
    h_team_offensive_rebounds SMALLINT NOT NULL,
    a_team_offensive_rebounds SMALLINT NOT NULL,
    h_team_personal_fouls SMALLINT NOT NULL,
    a_team_personal_fouls SMALLINT NOT NULL,
    h_team_points SMALLINT NOT NULL,
    a_team_points SMALLINT NOT NULL
);

CREATE INDEX h_team_a_team ON games (h_team_a_team_date);
CREATE INDEX h_team_a_team_date_IDX ON games (h_team_a_team_date, game_date);
CREATE INDEX game_date_IDX ON games (game_date);
CREATE INDEX h_team_name_IDX ON games (h_team_name, game_date);
CREATE INDEX a_team_name_IDX ON games (a_team_name, game_date);
CREATE INDEX h_team_won_IDX ON games (h_team_won, h_team_name);
CREATE INDEX a_team_won_IDX ON games (a_team_won, a_team_name);

