import getCategories from '@/actions/getCategories';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const categories = await getCategories();
    return NextResponse.json(categories);
}