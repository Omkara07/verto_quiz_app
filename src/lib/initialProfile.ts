import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// for the first time user => checks if user exist if not then create user profile
export const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        return redirect("/sign-in");
    }

    const profile = await db.user.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.user.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });
    return newProfile;
}