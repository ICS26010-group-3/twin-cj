import { Router } from "express";
import { getService } from "../controllers/service.controller";

const router = Router();

// Service Endpoint
router.get("/get", getService);

export default router;
