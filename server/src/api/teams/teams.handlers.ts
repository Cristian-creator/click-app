import e, { Response, Request, NextFunction } from 'express';
import { InsertOneResult, ModifyResult, ObjectId, OptionalId, WithId } from 'mongodb';
import { TeamMember } from '../../interfaces/TeamMember';
import compareValues from '../../utils/compareValues';
import { Team, TeamWithId, Teams, TeamData } from './team.model';

export async function findAll(req: Request, res: Response<any>, next: NextFunction) {
    try {
        const teams = await Teams.find().toArray();
        // let teamsData = teams.map((team) => {
        //     team.name,
            
        // });
        let teamsData = teams.map((team) => {
            const totalClicks = team.members.reduce((prev, curr) => prev + curr.clicks, 0);

            return {
                name: team.name,
                totalClicks,
            }
        });

        console.log("teamsData before: ", teamsData);
        

        teamsData = teamsData.sort((a, b) => compareValues(a.totalClicks, b.totalClicks));
    
        console.log("teamsData after: ", teamsData);

        res.json(teamsData);
    } catch (error) {
        next(error);
    }
}

export async function getLeaderBoard(req: Request, res: Response<any>, next: NextFunction) {
    try {
        const { memberId } = req.body;
        const teams = await Teams.find().toArray();

        let teamsData = teams.map((team) => {
            const currentUserClicks = team.members.filter((member) => member.memberId === memberId)[0]?.clicks || 0;
            const teamClicks = team.members.reduce((prev, curr) => prev + curr.clicks, 0);

            return {
                name: team.name,
                userClicks: currentUserClicks,
                teamClicks,
            }
        });

        teamsData = teamsData.sort((a, b) => compareValues(a.teamClicks, b.teamClicks));

        res.json(teamsData);
    } catch (error) {
        next(error);
    }
}

export async function getOrInsertOne(req: Request<{}, TeamData, any>, res: Response<TeamData>, next: NextFunction) {
    try {
        const { name, memberId, numberOfUserClicks } = req.body;
        const searchedTeam = await Teams.findOne({
            name,
        });

        // insert the team if it doesn't exist
        if(!searchedTeam) {
            const teamData = {
                name: req.body.name,
                members: [
                    {
                        memberId,
                        clicks: 1
                    }
                ],
            };

            let insertResult = await Teams.insertOne(teamData as any);

            if(!insertResult.acknowledged) throw Error('Error inserting team');

            res.status(201);
            res.json({
                userClicks: 1,
                teamClicks: 1
            });
        } else {
            const currentUserClicks = searchedTeam?.members?.filter((member) => member.memberId === memberId)[0]?.clicks;

            let newTeamData: ModifyResult<Team>;

            // check if the member is part of the team
            const userIsPartOfTheTeam = searchedTeam.members.filter((member) => member.memberId === memberId);            
            
            // insert member if it isn't part of the team
            if(!userIsPartOfTheTeam.length) {
                newTeamData = await Teams.findOneAndUpdate({
                    name: req.body.name,
                }, {
                    $push: { 
                        "members": {
                            memberId,
                            clicks: numberOfUserClicks,
                        },
                    }
                });
            } else {
                // update member if it is part of the team
                newTeamData = await Teams.findOneAndUpdate({
                    name: req.body.name, "members.memberId": memberId,
                }, {
                    $set: {
                        "members.$.clicks": currentUserClicks + numberOfUserClicks 
                    }
                });
            }
            
            console.log("newTeamData.value: ", newTeamData?.value);

            let teamClicks = newTeamData?.value?.members.reduce((prev, curr) => prev + curr.clicks, 0) || 0;
            console.log("current teamClicks: ", teamClicks);
            teamClicks += numberOfUserClicks;
            console.log("updated teamClicks: ", teamClicks);
            let userClicks = newTeamData?.value?.members.filter((member) => member.memberId === memberId)[0]?.clicks || 0;
            console.log("current userClicks: ", userClicks);
            userClicks += numberOfUserClicks;
            console.log("updated userClicks: ", userClicks);

            res.status(201);
            res.json({
                userClicks,
                teamClicks,
            });
        }

    } catch (error) {
        next(error);
    }
};

// export async function findOne(req: Request<ParamsWithId, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) {
//     try {
//         const result: any = await Todos.findOne({
//             _id: new ObjectId(req.params.id),
//         });

//         if(!result) {
//             res.status(404);
//             throw new Error(`Todo with id ${req.params.id} not found`);
//         }

//         res.json(result);
//     } catch (error) {
//         next(error);
//     }
// }

// export async function updateOne(req: Request<ParamsWithId, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
//     try {
//         const result = await Todos.findOneAndUpdate({
//             _id: new ObjectId(req.params.id),
//         }, {
//             $set: req.body,
//         }, {
//             returnDocument: 'after',
//         });

//         if(!result.value) {
//             res.status(404);
//             throw new Error(`Todo with id ${req.params.id} not found`);
//         }

//         res.json(result.value);
//     } catch (error) {
//         next(error);
//     }
// }

// export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
//     try {
//         const result = await Todos.findOneAndDelete({
//             _id: new ObjectId(req.params.id),
//         });

//         if(!result.value) {
//             res.status(404);
//             throw new Error(`Todo with id ${req.params.id} not found`);
//         }

//         res.status(204).end();
//     } catch (error) {
//         next(error);
//     }
// }

export async function deleteAll(req: Request, res: Response, next: NextFunction) {
    const results = await Teams.deleteMany({});
}
