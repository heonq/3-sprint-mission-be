import { prismaTestClient } from '@/jest.setup';
import LikeRepository from '@/routes/Articles/repository/likeRepository';
import { mockUser } from '@/mocks/service/mockUser';
import { mockArticle } from '@/mocks/service/mockArticle';
import { clearMocks } from '@/mocks/service/clearMocks';

describe('LikeRepository', () => {
  let likeRepository = new LikeRepository(prismaTestClient);

  beforeEach(async () => {
    await prismaTestClient.$transaction(async (tx) => {
      await clearMocks(tx);
      await mockUser(tx);
      await mockArticle(tx);
    });
  });

  afterAll(async () => {
    await prismaTestClient.$transaction(async (tx) => clearMocks(tx));
  });

  test('좋아요 추가/수량/좋아요 여부 조회', async () => {
    const USER_ID = 2;
    const ARTICLE_ID = 10;

    const likeCounterBefore = await likeRepository.countLike(ARTICLE_ID);
    await likeRepository.setLike(ARTICLE_ID, USER_ID);
    const likeCounterAfter = await likeRepository.countLike(ARTICLE_ID);
    const isLiked = await likeRepository.findIsLiked(ARTICLE_ID, USER_ID);

    expect(isLiked).toBe(true);
    expect(likeCounterAfter).toBeGreaterThan(likeCounterBefore);
  });

  test('좋아요 삭제/수량/좋아요 여부 조회', async () => {
    const USER_ID = 1;
    const ARTICLE_ID = 1;

    const likeCounterBefore = await likeRepository.countLike(ARTICLE_ID);
    await likeRepository.deleteLike(ARTICLE_ID, USER_ID);
    const likeCounterAfter = await likeRepository.countLike(ARTICLE_ID);
    const isLiked = await likeRepository.findIsLiked(ARTICLE_ID, USER_ID);

    expect(isLiked).toBe(false);
    expect(likeCounterAfter).toBeLessThan(likeCounterBefore);
  });
});
