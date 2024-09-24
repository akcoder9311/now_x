import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, username, name, password } = req.body;

        // Validate request body
        if (!email || !username || !name || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword,
                hasNotification:false
            }
        });

        // Return the created user
        return res.status(201).json(user);

    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}
