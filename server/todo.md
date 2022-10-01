Things to do:
[x] - schema for Teams document ( _id, name )
[] - CRU(D)
    [] - get the leaderboard (GET /api/v1/leaderboard) and the response.body should contain the ordered records based on number of clicks ( map TeamSessions document, group by clicks, create sum and then order them ) 
    [] - read or create a team (GET /api/v1/:team-name) if the team exists return the data, otherwise create it
    [] - update a team on landing page (POST /api/v1/:team-name) - and the response.body should contain the updated object
[] - write tests
[] - protection for XSS attacks ?
[] - protection over bots usage



<!-- [] - add cookie for seesion and should contain encrypted:
    [] - unique id for the user
    [] - name of the team -->