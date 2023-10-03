
import { Router } from "express";
import { findAllJobs, registerJob } from "../controllers/jsonController";

const router = Router();

router.get("/jobs", findAllJobs);

router.post("/jobs", registerJob);

export { router };