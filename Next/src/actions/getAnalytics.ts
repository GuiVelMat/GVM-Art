import { prisma } from "@/lib/prisma";

const colorArray = [
    '#FF5733', '#33AF52', '#3357FF', '#FF33A1', '#A133FF',
];

export async function getMostLikedProduct() {
    const data = await prisma.product.groupBy({
        by: ['id'],
        _sum: {
            favoritesCount: true
        },
        orderBy: {
            _sum: {
                favoritesCount: 'desc'
            }
        },
        take: 5
    })

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: data.map((item) => item.id)
            }
        }
    })

    const response = data.map((item, index) => {
        const product = products.find((product) => product.id === item.id);

        const colorIndex = index % colorArray.length;

        return {
            productName: product?.name,
            likeCount: item._sum.favoritesCount,
            fill: colorArray[colorIndex]
        }
    });

    return response;
}

export async function getMostBoughtProduct() {
    const data = await prisma.orderLine.groupBy({
        by: ['productPriceId'],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        },
        take: 5
    })

    const products = await prisma.productPrice.findMany({
        where: {
            id: {
                in: data.map((item) => item.productPriceId)
            }
        },
        include: {
            product: true,
            type: true
        }
    })

    const response = data.map((item, index) => {
        const product = products.find((product) => product.id === item.productPriceId);

        const colorIndex = index % colorArray.length;

        return {
            productName: `${product?.product.name.slice(0, 7)} - ${product?.type.name.slice(0, 7)}`,
            soldCount: item._count.id,
            fill: colorArray[colorIndex]
        }
    });

    return response;
}

export async function getSeriesPopularity() {
    const data = await prisma.product.groupBy({
        by: ['seriesId'],
        _sum: {
            favoritesCount: true
        },
        orderBy: {
            _sum: {
                favoritesCount: 'desc'
            }
        },
        take: 5
    })

    const series = await prisma.series.findMany({
        where: {
            id: {
                in: data.map((item) => item.seriesId)
            }
        }
    })

    const response = data.map((item, index) => {
        const serie = series.find((serie) => serie.id === item.seriesId);

        const colorIndex = index % colorArray.length;

        return {
            likeCount: item._sum.favoritesCount,
            seriesName: serie?.name,
            fill: colorArray[colorIndex]
        }
    });

    return response;
}

export async function getCollectionPopularity() {
    const data = await prisma.product.groupBy({
        by: ['collectionId'],
        _sum: {
            id: true
        },
        orderBy: {
            _sum: {
                id: 'desc'
            }
        },
        take: 5
    })

    const collections = await prisma.collection.findMany({
        where: {
            id: {
                in: data.map((item) => item.collectionId)
            }
        }
    })

    const response = data.map((item, index) => {
        const collection = collections.find((collection) => collection.id === item.collectionId);

        const colorIndex = index % colorArray.length;

        return {
            collectionName: collection?.name,
            likeCount: item._sum.id,
            fill: colorArray[colorIndex]
        }
    });

    return response;
}

export async function getWeeklySales() {
    // Fecha de hace 7 días
    const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

    const data = await prisma.$queryRaw`
    SELECT 
        DATE("createdAt") as date, 
        SUM("total") as totalAmount
        FROM "Order"
        WHERE "createdAt" >= ${lastWeek}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
    `

    return data;
}