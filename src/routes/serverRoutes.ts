
import { Router } from "express";
import { findAllJobs, registerJob, searchJobs } from "../controllers/jsonController";

const router = Router();

router.get("/jobs", findAllJobs);

router.post("/jobs", registerJob);

router.get("/searchjobs", searchJobs);

export { router };