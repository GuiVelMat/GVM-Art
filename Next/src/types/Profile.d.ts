import { Profile, User } from "@prisma/client";

export interface ProfileItem extends Omit<Profile, 'updatedAt', 'createdAt'> {
    id: number;
    username: string;
    bio: string | null;
    avatar: string | null;
    userId: number;
    user: User;
}

export interface ProfileResponse {
    profile: ProfileItem[];
}