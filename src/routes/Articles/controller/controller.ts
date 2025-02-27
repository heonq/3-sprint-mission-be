import { Request, Response } from 'express';
import { ArticleService } from '../service/service';
import { parseId } from '@/utils/parseId';

export class ArticleController {
  constructor(private articleService: ArticleService) {}

  postArticle = async (req: Request, res: Response) => {
    const createArticleDto = req.body;
    const userId = req.user?.userId!;

    const article = await this.articleService.postArticle(userId, createArticleDto);
    return res.status(201).json(article.toJSON());
  };

  getArticle = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;
    const articleEntity = await this.articleService.getArticleById(articleId, userId);

    return res.status(200).json(articleEntity.toJSON());
  };

  editArticle = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;
    const editArticleRequestDto = req.body;

    const articleEntity = await this.articleService.editArticle(
      articleId,
      userId,
      editArticleRequestDto,
    );

    return res.status(201).json(articleEntity.toJSON());
  };

  deleteArticle = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;

    await this.articleService.deleteArticle(articleId, userId);

    res.status(204);
  };

  getArticles = async (req: Request, res: Response) => {
    const getArticlesDto = req.validatedQuery;

    const result = await this.articleService.getArticleList(getArticlesDto);

    return res.status(200).json({
      ...result,
      list: result.list.map((article) => article.toJSON()),
    });
  };

  postArticleComment = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;
    const postArticleCommentDto = req.body;

    const commentEntity = await this.articleService.postArticleComment(
      articleId,
      userId,
      postArticleCommentDto,
    );

    return res.status(201).json(commentEntity.toJSON());
  };

  getArticleComments = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;
    const getArticleCommentsDto = req.validatedQuery;

    const result = await this.articleService.getArticleComments(
      articleId,
      userId,
      getArticleCommentsDto,
    );
    const comments = result.list.map((comment) => comment.toJSON());

    return res.status(200).json({
      ...result,
      list: comments,
    });
  };

  setLike = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;

    const articleEntity = await this.articleService.setLike(articleId, userId);

    return res.status(201).json(articleEntity.toJSON());
  };

  deleteLike = async (req: Request, res: Response) => {
    const articleId = parseId(req.params.articleId);
    const userId = req.user?.userId!;

    const articleEntity = await this.articleService.deleteLike(articleId, userId);

    return res.status(201).json(articleEntity.toJSON());
  };
}
