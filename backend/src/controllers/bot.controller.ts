import { Request, Response } from "express";
import { loadFAQsFromExcel, searchFAQs } from "../services/bot.service";
import { NOT_FOUND } from "../constants/http";

export const searchFAQsHandler = (req: Request, res: Response) => {
  const query = req.query.q as string;

  try {
    const results = searchFAQs(query);

    res.json(results);
  } catch (error: any) {
    res.status(NOT_FOUND).json({ error: error.message });
  }
};
