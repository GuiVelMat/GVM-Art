import { prisma } from "@/lib/prisma";
import { ProfileItem } from "@/types/Profile";

interface GetUserListParams {
    username?: string;
    page?: number;
    searchQuery?: string;
}

export default async function getUserList(params: GetUserListParams = {}): Promise<ProfileItem[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (params.searchQuery) {
        query.username = {
            contains: params.searchQuery,
            mode: 'insensitive'
        }
    };

    const data = await prisma.profile.findMany({
        where: query,
        select: {
            id: true,
            username: true,
            bio: true,
            avatar: true,
            userId: true,
            user: true
        },
        orderBy: {
            id: 'desc'
        }
    });

    return data;
}