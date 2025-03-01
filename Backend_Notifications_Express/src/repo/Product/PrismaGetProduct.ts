import { PrismaClient, Product} from '@prisma/client';
const prisma = new PrismaClient();

export default async function prismaGetProduct(productId:number): Promise<Product | null> {
const product = await prisma.product.findUnique({

        where: {
            id: productId
        }
    });
return product;
}