import { getNotifications } from '@/actions/getNotifications';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../exceptions';

export const GET = async () => {
    const notifications = await getNotifications();
    return NextResponse.json(notifications);
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true
            }
        })

        if (!users.length) {
            return ApiResponse.badRequest("No users found");
        }

        const notifications = await prisma.$transaction(
            users.map(user => prisma.notification.create({
                data: {
                    message: body.message,
                    userId: user.id,
                    notificationType: body.notificationType
                }
            }))
        )

        return ApiResponse.ok(`Success, ${notifications.length} notifications sent`);
    } catch (error) {
        console.error(error);
        return ApiResponse.badRequest(error);
    }
}