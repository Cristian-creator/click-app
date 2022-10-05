export interface Team {
    _id: string,
    name: string,
    members: TeamMember[],
}

export interface TeamMember {
    memberId: string,
    clicks: number,
}

export interface TeamsState {
    currentMemberId: string,
    leadingTeams: LeadingTeamData[]
}

export interface LeadingTeamData {
    name: string,
    userClicks: number,
    teamClicks: number,
};

export interface TeamData {
    userClicks: number,
    teamClicks: number,
};

// export type RootState = ReturnType<typeof store.getState>
