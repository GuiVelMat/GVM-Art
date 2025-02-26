require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.favorites.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.follows.deleteMany();
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartProduct.deleteMany();
  await prisma.ProductPrice.deleteMany();
  await prisma.imagesProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.series.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.carousel.deleteMany();
  await prisma.type.deleteMany();
  await prisma.cart.deleteMany();
  // await prisma.token.deleteMany();
  // await prisma.blacklist.deleteMany();
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Collection" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Series" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Favorites" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Notification" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Follows" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "OrderLine" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "ImagesProduct" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Profile" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Carousel" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Type" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Premium" RESTART IDENTITY CASCADE;');
  // await prisma.$executeRawUnsafe('TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE;');
  // await prisma.$executeRawUnsafe('TRUNCATE TABLE "Blacklist" RESTART IDENTITY CASCADE;');
}

async function main() {
  await clearDatabase();
  // Crear usuarios
  const users = await prisma.user.createMany({
    data: [
      { email: 'test@test.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'USER' },
      { email: 'artist2@example.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'USER' },
      { email: 'user1@example.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'USER' },
      { email: 'user2@example.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'USER' },
      { email: 'admin@example.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'ADMIN' },
      { email: 'premium1@example.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'PREMIUM' },
      { email: 'premium2@example.com', password: '$argon2id$v=19$m=65536,t=3,p=4$OBirkoPe07aWfMJ1i8bFPw$7cRO/svM+LNw4ys4IiOze1fz1xBs51a9+wMJ84kCCgg', role: 'PREMIUM' },
    ],
  });

  console.log('Usuarios creados:', users);

  // Crear categorías
  const categories = [];
  categories.push(await prisma.category.create({
    data: { name: 'Portraits', slug: 'portraits', image: 'https://picsum.photos/200' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Backgrounds', slug: 'backgrounds', image: 'https://picsum.photos/200' },
  }));
  categories.push(await prisma.category.create({
    data: { name: '3D Models', slug: '3d-models', image: 'https://picsum.photos/200' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Weapons', slug: 'Weapons', image: 'https://picsum.photos/200' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Concept Art', slug: 'concept-art', image: 'https://picsum.photos/200' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Fanart', slug: 'fanart', image: 'https://picsum.photos/200' },
  }));
  categories.push(await prisma.category.create({
    data: { name: 'Animations', slug: 'animations', image: 'https://picsum.photos/200' },
  }));

  console.log('Categorías creadas:', categories);

  // Crear tipos de producto
  const types = [];
  types.push(await prisma.type.create({
    data: { name: 'Print', slug: 'print', image: 'https://picsum.photos/200' },
  }));
  types.push(await prisma.type.create({
    data: { name: 'Digital copy', slug: 'digital-copy', image: 'https://picsum.photos/200' },
  }));
  types.push(await prisma.type.create({
    data: { name: '3D', slug: '3d', image: 'https://picsum.photos/200' },
  }));
  types.push(await prisma.type.create({
    data: { name: 'Limited Edition bundle', slug: 'limited-edition-bundle', image: 'https://picsum.photos/200' },
  }));

  console.log('Tipos de producto creados:', types);

  // Crear colecciones
  const collections = [];
  collections.push(await prisma.collection.create({
    data: { name: 'Reminiscence', slug: 'Reminiscence', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Tarot', slug: 'Tarot', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Bubbly colors', slug: 'Bubbly-colors', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Travel around Japan', slug: 'Travel-around-Japan', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Cozy', slug: 'Cozy', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Dragon Dance', slug: 'Dragon-Dance', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Cosmos', slug: 'Cosmos', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'K-pop', slug: 'K-pop', image: 'https://picsum.photos/200' },
  }));
  collections.push(await prisma.collection.create({
    data: { name: 'Reto Loulogio', slug: 'Reto-Loulogio', image: 'https://picsum.photos/200' },
  }));

  console.log('Colecciones creadas:', collections);

  // Crear series
  const series = [];
  series.push(await prisma.series.create({
    data: { name: 'Pokemon', slug: 'pokemon', image: 'col_pokemon.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'LoL', slug: 'lol', image: 'col_lol.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Genshin', slug: 'genshin', image: 'col_genshin.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'GoT', slug: 'got', image: 'col_got.png' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Dungeons & Dragons', slug: 'dungeons-&-dragons', image: 'col_dnd.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Marvel', slug: 'marvel', image: 'col_marvel.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Honkai Star Rail', slug: 'honkai-star-rail', image: 'col_honkai.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Final Fantasy XIV', slug: 'final-fantasy-xiv', image: 'col_ffxiv.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Hololive', slug: 'hololive', image: 'col_hololive.jpg' },
  }));
  series.push(await prisma.series.create({
    data: { name: 'No series', slug: 'no-series', image: null },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Hyouka', slug: 'hyouka', image: null },
  }));
  series.push(await prisma.series.create({
    data: { name: 'Avatar (ATLA)', slug: 'avatar-(atla)', image: null },
  }));

  console.log('Series creadas:', series);

  // Crear productos con relaciones
  const products = [];
  products.push(await prisma.product.create({
    data: {
      name: 'Aomori Fauna',
      slug: 'Aomori-Fauna',
      stock: 10,
      userId: 1,
      collectionId: 4,
      seriesId: 9,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Signal Sky',
      slug: 'Signal-Sky',
      stock: 5,
      userId: 2,
      collectionId: 4,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Endwalker',
      slug: 'Endwalker',
      stock: 15,
      userId: 1,
      collectionId: 1,
      seriesId: 8,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'iRys',
      slug: 'iRys',
      stock: 8,
      userId: 2,
      collectionId: 1,
      seriesId: 9,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Sana',
      slug: 'Sana',
      stock: 12,
      userId: 1,
      collectionId: 3,
      seriesId: 9,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Puerto al alba',
      slug: 'Puerto-al-alba',
      stock: 10,
      userId: 2,
      collectionId: 5,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Puerto al ocaso',
      slug: 'Puerto-al-ocaso',
      stock: 5,
      userId: 1,
      collectionId: 5,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Cafe Hyouka',
      slug: 'Cafe-Hyouka',
      stock: 15,
      userId: 2,
      collectionId: 1,
      seriesId: 11,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Cage interpretation',
      slug: 'Cage-interpretation',
      stock: 8,
      userId: 1,
      collectionId: 9,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Dragon dance - Zuko',
      slug: 'Dragon-dance-Zuko',
      stock: 12,
      userId: 2,
      collectionId: 6,
      seriesId: 12,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Dragon dance - Aang',
      slug: 'Dragon-dance-Aang',

      stock: 10,
      userId: 1,
      collectionId: 6,
      seriesId: 12,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Pokemon Galicia',
      slug: 'Pokemon-Galicia',
      stock: 15,
      userId: 2,
      collectionId: 9,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Temple Yue',
      slug: 'Temple-Yue',
      stock: 8,
      userId: 1,
      collectionId: 1,
      seriesId: 5,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Moonholder Yue',
      slug: 'Moonholder-Yue',
      stock: 12,
      userId: 2,
      collectionId: 7,
      seriesId: 5,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Agni kai',
      slug: 'Agni-kai',
      stock: 10,
      userId: 1,
      collectionId: 6,
      seriesId: 12,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Hoenn',
      slug: 'Hoenn',
      stock: 15,
      userId: 2,
      collectionId: 5,
      seriesId: 1,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Hyouka finale',
      slug: 'Hyouka-finale',
      stock: 8,
      userId: 1,
      collectionId: 1,
      seriesId: 11,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Starry night',
      slug: 'Starry-night',
      stock: 12,
      userId: 2,
      collectionId: 7,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Heize',
      slug: 'Heize',
      stock: 10,
      userId: 1,
      collectionId: 8,
      seriesId: 10,
    },
  }));
  products.push(await prisma.product.create({
    data: {
      name: 'Kokomi',
      slug: 'Kokomi',
      stock: 15,
      userId: 2,
      collectionId: 2,
      seriesId: 3,
    },
  }));

  console.log('Productos creados:', products);

  /**
   * CREAR LOS DUMMIES DE LAS TABLAS PIVOT
   */

  await prisma.product.update({
    where: { id: products[0].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
          { id: categories[2].id },
        ]
      },
    }
  })

  await prisma.product.update({
    where: { id: products[1].id },
    data: {
      categories: {
        connect: [
          { id: categories[5].id },
        ]
      },
    }
  })

  await prisma.product.update({
    where: { id: products[2].id },
    data: {
      categories: {
        connect: [
          { id: categories[0].id },
          { id: categories[2].id },
          { id: categories[4].id },
        ]
      },
    }
  })

  await prisma.product.update({
    where: { id: products[3].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
          { id: categories[4].id },
        ]
      },
    }
  })

  await prisma.product.update({
    where: { id: products[4].id },
    data: {
      categories: {
        connect: [
          { id: categories[3].id },
        ]
      },
    }
  })
  await prisma.product.update({
    where: { id: products[5].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
          { id: categories[4].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[6].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[7].id },
    data: {
      categories: {
        connect: [
          { id: categories[0].id },
          { id: categories[4].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[8].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[9].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
          { id: categories[4].id },
        ]
      },
    }
  });
  await prisma.product.update({
    where: { id: products[10].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
          { id: categories[5].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[11].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[12].id },
    data: {
      categories: {
        connect: [
          { id: categories[0].id },
          { id: categories[4].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[13].id },
    data: {
      categories: {
        connect: [
          { id: categories[3].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[14].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
          { id: categories[4].id },
        ]
      },
    }
  });
  await prisma.product.update({
    where: { id: products[15].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
          { id: categories[0].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[16].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[17].id },
    data: {
      categories: {
        connect: [
          { id: categories[0].id },
          { id: categories[4].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[18].id },
    data: {
      categories: {
        connect: [
          { id: categories[1].id },
          { id: categories[2].id },
          { id: categories[4].id },
        ]
      },
    }
  });

  await prisma.product.update({
    where: { id: products[19].id },
    data: {
      categories: {
        connect: [
          { id: categories[2].id },
          { id: categories[3].id },
        ]
      },
    }
  });
  console.log('Productos con categorías creados:', products);

  // Crear precios para los productos con múltiples tipos
  const productPrices = await prisma.productPrice.createMany({
    data: [
      // Producto 1
      { productId: products[0].id, typeId: types[0].id, price: 25.99 }, // Print
      { productId: products[0].id, typeId: types[1].id, price: 15.99 }, // Digital copy

      // Producto 2
      { productId: products[1].id, typeId: types[0].id, price: 19.99 },
      { productId: products[1].id, typeId: types[2].id, price: 29.99 },

      // Producto 3
      { productId: products[2].id, typeId: types[0].id, price: 29.99 },
      { productId: products[2].id, typeId: types[3].id, price: 49.99 },

      // Producto 4
      { productId: products[3].id, typeId: types[1].id, price: 22.50 },
      { productId: products[3].id, typeId: types[2].id, price: 35.00 },

      // Producto 5
      { productId: products[4].id, typeId: types[0].id, price: 27.99 },
      { productId: products[4].id, typeId: types[1].id, price: 17.99 },
      { productId: products[4].id, typeId: types[3].id, price: 55.00 },

      // Producto 6
      { productId: products[5].id, typeId: types[0].id, price: 24.50 },
      { productId: products[5].id, typeId: types[2].id, price: 32.99 },

      // Producto 7
      { productId: products[6].id, typeId: types[1].id, price: 21.99 },
      { productId: products[6].id, typeId: types[3].id, price: 42.50 },

      // Producto 8
      { productId: products[7].id, typeId: types[0].id, price: 30.00 },
      { productId: products[7].id, typeId: types[1].id, price: 20.00 },

      // Producto 9
      { productId: products[8].id, typeId: types[0].id, price: 26.99 },
      { productId: products[8].id, typeId: types[2].id, price: 38.99 },

      // Producto 10
      { productId: products[9].id, typeId: types[1].id, price: 23.50 },
      { productId: products[9].id, typeId: types[3].id, price: 50.00 },

      // Producto 11
      { productId: products[10].id, typeId: types[0].id, price: 28.99 },
      { productId: products[10].id, typeId: types[2].id, price: 40.99 },

      // Producto 12
      { productId: products[11].id, typeId: types[1].id, price: 31.99 },
      { productId: products[11].id, typeId: types[3].id, price: 60.00 },

      // Producto 13
      { productId: products[12].id, typeId: types[0].id, price: 20.50 },
      { productId: products[12].id, typeId: types[1].id, price: 14.50 },

      // Producto 14
      { productId: products[13].id, typeId: types[2].id, price: 32.99 },
      { productId: products[13].id, typeId: types[3].id, price: 58.50 },

      // Producto 15
      { productId: products[14].id, typeId: types[0].id, price: 18.99 },
      { productId: products[14].id, typeId: types[1].id, price: 12.99 },

      // Producto 16
      { productId: products[15].id, typeId: types[2].id, price: 25.50 },
      { productId: products[15].id, typeId: types[3].id, price: 45.00 },

      // Producto 17
      { productId: products[16].id, typeId: types[0].id, price: 29.99 },
      { productId: products[16].id, typeId: types[1].id, price: 19.99 },

      // Producto 18
      { productId: products[17].id, typeId: types[2].id, price: 33.99 },
      { productId: products[17].id, typeId: types[3].id, price: 65.00 },

      // Producto 19
      { productId: products[18].id, typeId: types[0].id, price: 22.99 },
      { productId: products[18].id, typeId: types[1].id, price: 16.99 },

      // Producto 20
      { productId: products[19].id, typeId: types[2].id, price: 30.50 },
      { productId: products[19].id, typeId: types[3].id, price: 55.50 },
    ],
  });

  console.log('Precios de productos creados:', productPrices);





  // Crear imágenes para los productos
  const imagesProduct = await prisma.imagesProduct.createMany({
    data: [
      { productId: products[0].id, src: 'prod_1.jpg', alt: 'Aomori Fauna', size: 'wide' },
      { productId: products[1].id, src: 'prod_2.jpg', alt: 'Signal Sky', size: 'wide' },
      { productId: products[2].id, src: 'prod_3.jpg', alt: 'Endwalker', size: 'wide' },
      { productId: products[3].id, src: 'prod_4.jpg', alt: 'iRys', size: 'wide' },
      { productId: products[4].id, src: 'prod_5.jpg', alt: 'Sana', size: 'wide' },
      { productId: products[5].id, src: 'prod_6.png', alt: 'Puerto al alba', size: 'wide' },
      { productId: products[6].id, src: 'prod_7.jpg', alt: 'Puerto al ocaso', size: 'wide' },
      { productId: products[7].id, src: 'prod_8.jpg', alt: 'Cafe Hyouka', size: 'wide' },
      { productId: products[8].id, src: 'prod_9.jpg', alt: 'Cage interpretation', size: 'wide' },
      { productId: products[9].id, src: 'prod_11.jpg', alt: 'Dragon dance - Zuko', size: 'wide' },
      { productId: products[10].id, src: 'prod_10.jpg', alt: 'Dragon dance - Aang', size: 'wide' },
      { productId: products[11].id, src: 'prod_12.jpg', alt: 'Pokemon Galicia', size: 'wide' },
      { productId: products[12].id, src: 'prod_13.jpg', alt: 'Temple Yue', size: 'wide' },
      { productId: products[13].id, src: 'prod_14.png', alt: 'Moonholder Yue', size: 'tall' },
      { productId: products[14].id, src: 'prod_15.jpg', alt: 'Agni kai', size: 'wide' },
      { productId: products[15].id, src: 'prod_16.jpg', alt: 'Hoenn', size: 'square' },
      { productId: products[16].id, src: 'prod_17.jpg', alt: 'Hyouka finale', size: 'wide' },
      { productId: products[17].id, src: 'prod_18.jpeg', alt: 'Starry night', size: 'wide' },
      { productId: products[18].id, src: 'prod_19.jpg', alt: 'Heize', size: 'square' },
      { productId: products[19].id, src: 'prod_20.jpg', alt: 'Kokomi', size: 'tall' },
    ],
  });

  console.log('Imágenes de productos creadas:', imagesProduct);

  // Crear órdenes con líneas de pedidos
  const orders = await prisma.order.createMany({
    data: [
      { slug: 'order-001', userId: 3, total: 120.99 },
      { slug: 'order-002', userId: 4, total: 220.5 },
      { slug: 'order-003', userId: 3, total: 95.75 },
      { slug: 'order-004', userId: 4, total: 150.25 },
      { slug: 'order-005', userId: 3, total: 199.99 },
    ],
  });

  console.log('Órdenes creadas:', orders);

  const carousels = await prisma.carousel.createMany({
    data: [
      {
        title: 'Aomori Fauna',
        slug: 'Aomori-Fauna',
        description: '¡Últimas unidades en prints firmadas, date prisa para conseguir una!',
        image: 'carousel_1.jpg',
        href: '/Details/Aomori-Fauna',
        slide_number: 1
      },
      {
        title: 'Backgrounds',
        slug: 'backgrounds',
        description: 'Echa un vistazo a la categoría con los mejores paisajes',
        image: 'carousel_2.jpg',
        href: '/Shop?Category=backgrounds',
        slide_number: 2
      },
      {
        title: 'Final Fantasy XIV',
        slug: 'final-fantasy-xiv',
        description: 'Rememora tus escenas favoritas con la colección del aclamado MMO',
        image: 'carousel_3.jpg',
        href: '/Shop?Series=final-fantasy-xiv',
        slide_number: 3
      },
      {
        title: 'Fanart',
        slug: 'fanart',
        description: '¡Descubre nuestro catálogo de Fanarts!',
        image: 'carousel_4.jpg',
        href: '/Shop?Category=fanart',
        slide_number: 4
      },
    ],
  });

  console.log('Carruseles creados:', carousels);

  // Crear perfiles de usuario
  const profiles = await prisma.profile.createMany({
    data: [
      { username: 'artist_one', bio: 'Digital artist specialized in illustrations.', avatar: 'https://via.placeholder.com/150', userId: 1 },
      { username: 'artist_two', bio: '3D modeler and animation enthusiast.', avatar: 'https://via.placeholder.com/150', userId: 2 },
      { username: 'user_one', bio: 'Art collector and enthusiast.', avatar: 'https://via.placeholder.com/150', userId: 3 },
      { username: 'user_two', bio: 'Photographer and digital art fan.', avatar: 'https://via.placeholder.com/150', userId: 4 },
      { username: 'admin', bio: 'Administrator of the platform.', avatar: 'https://via.placeholder.com/150', userId: 5 },
      { username: 'premium_one', bio: 'Premium user with access to exclusive content.', avatar: 'https://via.placeholder.com/150', userId: 6 },
      { username: 'premium_two', bio: 'Premium user with access to exclusive content.', avatar: 'https://via.placeholder.com/150', userId: 7 },
    ],
  });

  console.log('Perfiles creados:', profiles);

  // Crear favoritos
  const favorites = await prisma.favorites.createMany({
    data: [
      { productId: 1, userId: 3 },
      { productId: 2, userId: 3 },
      { productId: 3, userId: 4 },
      { productId: 4, userId: 4 },
    ],
  });

  console.log('Favoritos creados:', favorites);

  // Crear seguidores
  const follows = await prisma.follows.createMany({
    data: [
      { followerId: 3, followingId: 1 },
      { followerId: 4, followingId: 1 },
      { followerId: 3, followingId: 2 },
      { followerId: 4, followingId: 2 },
    ],
  });

  console.log('Seguidores creados:', follows);

  // Crear notificaciones
  const notifications = await prisma.notification.createMany({
    data: [
      { message: 'Your artwork has been approved!', userId: 1, isRead: true, notificationType: 'bell' },
      { message: 'New follower: user_one.', userId: 1, isRead: false, notificationType: 'bell' },
      { message: 'Your order has been shipped.', userId: 3, isRead: true, notificationType: 'email' },
      { message: 'Your payment has been confirmed.', userId: 4, isRead: true, notificationType: 'email' },
    ],
  });

  console.log('Notificaciones creadas:', notifications);

  // Crear carritos
  const carts = await prisma.cart.createMany({
    data: [
      { userId: 3, total: 0 },
      { userId: 4, total: 0 },
    ],
  });

  console.log('Carritos creados:', carts);

  // Crear líneas de órdenes
  const orderLines = await prisma.orderLine.createMany({
    data: [
      { orderId: 1, productPriceId: 1, quantity: 1, price: 120.99 },
      { orderId: 2, productPriceId: 2, quantity: 1, price: 220.5 },
      { orderId: 3, productPriceId: 3, quantity: 2, price: 191.5 },
      { orderId: 4, productPriceId: 4, quantity: 1, price: 150.25 },
    ],
  });


  console.log('Líneas de órdenes creadas:', orderLines);

  const Premium = await prisma.premium.createMany({
    data: [
      {
        userId: 6,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: 'ACTIVE',
      },
      {
        userId: 7,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: 'ACTIVE',
      },
    ],
  });

  console.log('Suscripciones premium creadas:', Premium);

  const PremiumPost = await prisma.PremiumPost.createMany({
    data: [
      {
        title: 'Paisaje Natural',
        src: 'https://picsum.photos/seed/1/400/300',
        description: 'Una hermosa vista de montañas y lagos.',
        postType: 'image',
      },
      {
        title: 'Big Buck Bunny',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Un corto animado sobre un conejo gigante.',
        postType: 'video',
      },
      {
        title: 'Ciudad Moderna',
        src: 'https://picsum.photos/seed/2/400/300',
        description: 'Rascacielos y arquitectura urbana.',
        postType: 'image',
      },
      {
        title: "Elephant's Dream",
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Un fascinante corto de ciencia ficción.',
        postType: 'video',
      },
    ]
  });

  // Crear tokens
  // const tokens = await prisma.token.createMany({
  //   data: [
  //     { token: 'abc123', userId: 1 },
  //     { token: 'def456', userId: 2 },
  //     { token: 'ghi789', userId: 3 },
  //   ],
  // });

  // console.log('Tokens creados:', tokens);

  // Crear tokens en la lista negra
  // const blacklistedTokens = await prisma.blacklist.createMany({
  //   data: [
  //     { token: 'expiredToken123' },
  //     { token: 'maliciousToken456' },
  //   ],
  // });

  // console.log('Tokens en lista negra creados:', blacklistedTokens);

  console.log('Datos dummy creados con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
