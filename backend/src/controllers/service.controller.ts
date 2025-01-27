import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";

export const getService = catchErrors(
  async (request: Request, response: Response) => {
    response.json({ message: "Service is running", success: true });
  }
);
