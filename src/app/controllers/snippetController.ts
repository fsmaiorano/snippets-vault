import { Request, Response, NextFunction } from "express";
import { SnippetService, CategoryService } from "../../database/services";
import { Snippet } from "../models";

const hljs = require("highlight.js");
const md = require("markdown-it")({
  highlight: (str: any, lang: any) => {
    console.log("passei");
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${
        hljs.highlight(lang, str.trim(), true).value
      }</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(
      str.trim()
    )}</code></pre>`;
  }
});

class SnippetController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const { title, content } = req.body;

      const category = await CategoryService.getById(categoryId);

      let newSnippet = new Snippet();
      newSnippet.title = title;
      newSnippet.content = md.render(content);
      // newSnippet.content = content;
      newSnippet.categoryId = category.id;
      newSnippet.createdAt = new Date();
      newSnippet.updatedAt = new Date();

      const snippet = await SnippetService.create(newSnippet);
      res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { session } = req;
      const { categoryId, snippetId } = req.params;
      const categories = await CategoryService.getAllByUserId(session.user.id);
      const category = await CategoryService.getById(categoryId);
      const snippets = await SnippetService.getAllByCategory(category);

      const currentSnippet = await SnippetService.getSnippetById(snippetId);

      res.render("snippets/show", {
        activeCategory: categoryId,
        currentSnippet: currentSnippet,
        categories,
        snippets
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {}
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { snippetId } = req.params;
      const snippet = await SnippetService.getSnippetById(snippetId);
      await SnippetService.destroy(snippet);
      return res.redirect(`/app/categories/${req.params.categoryId}`);
    } catch (err) {
      next(err);
    }
  }
}

export default new SnippetController();
