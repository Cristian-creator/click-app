Things to do:

[] - when a new team is created insert into state
[] - bugs when a new team is created

[] - request data ONCE and just in the App component
[] - in each component use redux state
    [] - create selector for a particular Team
    [] - create action to update a team
        [] - update number of clicks
        [] - post request with updates + throttle

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

Sort teams on back-end by number of clicks:
[] - METHOD 1: sort them on query time and respond with the array of sorted teams, each team containing the following data:
    [] - teamName
    [] - userClicks
    [] - teamClicks
[] - METHOD 1: try to sort them on query time