import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Only allow GET requests
    if (req.method != 'GET') {
        return res.status(405).end();
    }

    try {
        // Authenticate and fetch the current user
        const { currentUser } = await serverAuth(req);
        console.log('Current User:', currentUser);  // Debug logging
        return res.status(200).json(currentUser);
    } catch (error) {
        console.error('Error fetching current user:', error);  // More specific logging
        return res.status(400).end();  // Use 401 for unauthorized access
    }
}
