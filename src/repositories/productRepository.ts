import { getOrderByClause, INCLUDE_USER_CLAUSE } from '../constants/prisma';
import { prismaClient } from '../prismaClient';
import { GetProductListParams, ProductRequestDto } from '../types/dtos/productDto';

export default class ProductRepository {
  async create(userId: number, data: ProductRequestDto) {
    return await prismaClient.product.create({
      data: {
        ...data,
        userId,
      },
      include: INCLUDE_USER_CLAUSE,
    });
  }

  async update(productId: number, data: Partial<ProductRequestDto>) {
    return await prismaClient.product.update({
      where: {
        id: productId,
      },
      data,
      include: INCLUDE_USER_CLAUSE,
    });
  }

  async findById(productId: number) {
    return await prismaClient.product.findUnique({
      where: {
        id: productId,
      },
      include: INCLUDE_USER_CLAUSE,
    });
  }

  async getProductList({ page, pageSize, orderBy, keyword }: GetProductListParams) {
    const skip = (page - 1) * pageSize;

    const whereClause = keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              description: {
                contains: keyword,
              },
            },
          ],
        }
      : undefined;

    const [list, totalCount] = await Promise.all([
      prismaClient.product.findMany({
        skip,
        take: pageSize,
        orderBy: getOrderByClause(orderBy),
        where: whereClause,
        include: INCLUDE_USER_CLAUSE,
      }),
      prismaClient.product.count({
        where: whereClause,
      }),
    ]);

    return {
      list,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async delete(productId: number) {
    await prismaClient.product.delete({
      where: {
        id: productId,
      },
    });
  }
}