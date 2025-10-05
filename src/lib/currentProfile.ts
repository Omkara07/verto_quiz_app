import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";

export default async function CurrentProfile() {
    const { userId } = await auth();
    if (!userId) return null;

    // return the profile of the currently logged in user
    const currentProfile = await db.user.findUnique({
        where: {
            userId
        }
    });
    return currentProfile
}