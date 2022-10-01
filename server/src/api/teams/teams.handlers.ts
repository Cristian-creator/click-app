import e, { Response, Request, NextFunction } from 'express';
import { InsertOneResult, ModifyResult, ObjectId, OptionalId, WithId } from 'mongodb';
import { TeamMember } from '../../interfaces/TeamMember';
import { Team, TeamWithId, Teams } from './team.model';

export async function getLeaderBoard(req: Request, res: Response<WithId<Team>[]>, next: NextFunction) {
    try {
        const teams = await Teams.find().toArray();
    
        res.json(teams);
    } catch (error) {
        next(error);
    }
}

export async function getOrInsertOne(req: Request<{}, TeamWithId, any>, res: Response<TeamWithId>, next: NextFunction) {
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
                _id: insertResult.insertedId,
                ...teamData,
            });
        } else {
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
                            clicks: 1,
                        },
                    }
                });


            } else {
                // update member if it is part of the team
                newTeamData = await Teams.findOneAndUpdate({
                    name: req.body.name, "members.memberId": memberId,
                }, {
                    $set: {
                        "members.$.clicks": numberOfUserClicks 
                    }
                });
            }

            res.status(201);
            res.json(req.body);
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
