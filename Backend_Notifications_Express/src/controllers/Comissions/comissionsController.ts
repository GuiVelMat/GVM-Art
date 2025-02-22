import { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import CreateComission from '../../services/Comissions/CreateComission';

export const Comissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const comissionData = req.body;

        if (!comissionData.name || !comissionData.email || !comissionData.description) {
            res.status(400).json({ message: 'Required data missing' });
            return;
        }

        await CreateComission(comissionData);

        res.status(201).json({ message: 'Comission request sent' });
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            console.error('Unexpected error in Comissions:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
