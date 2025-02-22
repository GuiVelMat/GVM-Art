import { NextRequest } from "next/server";
import { ApiResponse } from "../exceptions";
import { fetchWrapper } from "@/utils/fetch";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const emailComission = await fetchWrapper("http://localhost:4000/api/notifications/Comissions", "POST", body);
    if (!emailComission) {
        return ApiResponse.badRequest("Error sending email");
    }

    return ApiResponse.ok("Commission request received");
}