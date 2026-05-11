import { db } from "@/lib/db";

export async function getProducts(searchParams: {
  category?: string;
  size?: string;
  color?: string;
  query?: string;
}) {
  const { category, size, color, query } = searchParams;

  return await db.product.findMany({
    where: {
      isArchived: false,
      AND: [
        category ? { category: { slug: category } } : {},
        query ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ]
        } : {},
        (size || color) ? {
          variants: {
            some: {
              AND: [
                size ? { size } : {},
                color ? { color } : {},
                { stock: { gt: 0 } }
              ]
            }
          }
        } : {},
      ]
    },
    include: {
      category: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    }
  });
}

export async function getProductBySlug(slug: string) {
  return await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: {
        include: {
          user: true
        }
      }
    }
  });
}

export async function getCategories() {
  return await db.category.findMany({
    orderBy: { name: "asc" }
  });
}
