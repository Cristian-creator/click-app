

const config = {
    clientURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '', 
    leaderboard: {
        numberOfDisplayedTeamsOnHomePage: 10,
        numberOfDisplayedTeamsOnDetailsPage: 8,
    }
}

export default config;