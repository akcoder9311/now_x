import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if (req.method != 'POST' && req.method != 'DELETE') {
        return res.status(405).end();
    }


    try {
        const {userId } = req.body;

        const {currentUser} = await serverAuth(req);

        if (!userId || typeof userId != 'string') {
            throw new Error('Invalid ID');
        }

        const user = await prisma?.user.findUnique({
            where:{
                id:userId
            }
        });
        

        if (!userId) {
            throw new Error('Invalid ID');
        }

        let updatedFollowingIDs = [...(user?.followingIds || [])];

        if (req.method == 'POST') {
            updatedFollowingIDs.push(userId);
        }

        if (req.method == 'DELETE') {
            updatedFollowingIDs = updatedFollowingIDs.filter( followingId => followingId != userId)
        }


        const updateUser =await prisma?.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                followingIds:updatedFollowingIDs
            }
        })

        return res.status(200).json(updateUser);
        
    } catch (error) {
    console.log(error);
    return res.status(400).end();
        
    }

}