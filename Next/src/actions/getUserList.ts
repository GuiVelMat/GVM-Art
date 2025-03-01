import { prisma } from "@/lib/prisma";
import { ProfileItem } from "@/types/Profile";

export default async function getUserList(): Promise<ProfileItem[]> {
    const data = await prisma.profile.findMany({
        select: {
            id: true,
            username: true,
            bio: true,
            avatar: true,
            userId: true,
            user: true
        }
    });

    return data;
}