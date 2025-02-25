import { prisma } from '@/lib/prisma'
import getCurrentUser from './getCurrentUser';

interface IProductParams {
  slug: string
}



export async function getProduct(params: IProductParams) {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id;

  const data = await prisma.product.findUnique({
    where: { slug: params.slug, status: 'ACTIVE' },
    include: {
      artist: {
        include: {
          profile: true,
        },
      },
      categories: true,
      favoritedBy: {
        where: {
          userId: userId
        }
      },
      ImagesProduct: true,
      series: true,
      collections: true,
      productPrices: {
        include: {
          type: true,
        },
      },
    },
  })
  if (!data) {
    return null
  }

  const favorited = data.favoritedBy.some((fav) => fav.userId === userId);

  return {
    ...data,
    favorited,
    favoritedCount: data.favoritedBy.length,
  };
}
