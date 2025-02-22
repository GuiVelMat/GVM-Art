import { Resend } from 'resend';
import { Order, User as User, Profile, OrderLine } from "@prisma/client";
import { AppError } from '../../utils/AppError';
import PrismaGetUserProfile from '../../repo/User/PrismaGetUserProfile';
import { OrderLineItem } from '../../interfaces/OrderLine';
import { ICommission } from '../../interfaces/Comissions';


// Instancia de Resend con tu API Key
const resend = new Resend(process.env.RESEND_API_KEY as string);

/**
 * Enviar un correo usando Resend
 * @param to - Correo del destinatario
 * @param subject - Asunto del correo
 * @param html - Contenido HTML del correo
 */
export default async function CreateEmailComission(commision: ICommission): Promise<boolean> {
    try {
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="text-align: center;">comission from ${commision.name}</h1>
                <h1 style="text-align: center;">email: ${commision.email}</h1>
                <br><br>
                <h1 style="text-align: center;">description: ${commision.description}</h1>
            </div>
        `;

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            // to: user.email, 
            to: process.env.EMAIL ?? 'default@example.com',
            subject: "Order Confirmation",
            html: html
        });

        console.log('Correo enviado:', response);
        return true;
    } catch (error) {
        console.error('Error enviando correo:', error);
        return false;
    }
}