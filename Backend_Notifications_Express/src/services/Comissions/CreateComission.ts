import { AppError } from "../../utils/AppError";
import CreateEmailComission from "./CreateEmailComission";
import { ICommission } from "../../interfaces/Comissions";

export default async function CreateComission(comission: ICommission) {
    try {
        const ok = CreateEmailComission(comission);
    } catch (err) {
        if (err instanceof Error) {
            throw new AppError(err.message, 500);
        }
        throw err;
    }
}
