import { NextRequest } from "next/server";
import { ApiResponse } from "../../exceptions";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

export const PUT = async (req: NextRequest) => {
    const isCurrentUserAdmin = await getCurrentUser().then((user) => user?.role === 'ADMIN');
    if (!isCurrentUserAdmin) {
        return ApiResponse.forbidden();
    }

    const body = await req.json();
    console.log(body);

    ApiResponse.ok("User updated successfully");

    const updatedUser = await prisma.user.update({
        where: {
            id: body.id
        },
        data: {
            status: body.status
        }
    });

    if (!updatedUser) {
        return ApiResponse.badRequest('User update failed');
    }

    return ApiResponse.ok(body);
}