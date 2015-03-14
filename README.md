### Overview

This project makes available a fantastic historical data set of data from the National Basketball Association, for every game from 1985-86 to 2012-13. The data was originally made available [here](https://thecodebarbarian.wordpress.com/2014/02/14/crunching-30-years-of-nba-data-with-mongodb-aggregation/). Kudos to the author of that article for writing a scraper and pulling all this data one query at a time from the nba.com UI, which is the only way to access the data. 

That source makes the data available as mongodb binary data set -- I have converted it to JSON and posted it here as part of this project, so anyone can more easily use it with any data store, language, library, etc. 

Also included are scripts in node.js to load the data into Amazon's DynamoDB. Those tools were chosen only because my fortunes at that time led me to them -- as noted the data is in JSON so you can easily do with it what you will.  The included code is an example of loading the data into one schema, and querying it in various ways.

### Getting Started
 
Using the data set depends on the following dependencies.
 
* DynamoDB local installed. See [here](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html) for instructions on downloading and running.
* 'games' table created according to script in 'scripts_ddb.js'
* ~/.aws/credentials file accessible like so:
    
>     [default]
>     aws_access_key_id=AKIAIOSFODNN7EXAMPLE
>     aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

* ~/.aws/config file accessible like so:

>     [default]
>     region=us-east-1
>     output=json

* games.txt file is found at the location in 'PATH' var at top of this source file. Unzip the included games.txt.gz file.
