Things to do:

Requirements:
- create an unique id for each user ( which is going to be stored in Redux persist state )
- N:N when the input is submitted create or update the existing team ( add 1 to clicks column and create a new record / update a record in TeamMembers with userId and teamName )

Workflow:
[] - user lands on homepage leaderboard
[] - if there is NOT generated a sessionId ( basically user ID ) within Redux THEN create one
[] - request the top 10 ordered Teams based on 'clicks' column and leftJoin with sessionId clicks of current user 
[] - types an input and click 'Click' button
    [] - the input invalid ( prohibit spaces and add length restrictions )
    [] - the input is valid:
        [] - redirect to /:team-name
        [] - POST request with body consisting of teamName and sessionId
        [] - if my_clicks is equal to 0 then create a unique 'session id' and persist it in Redux Store 
        [] - 