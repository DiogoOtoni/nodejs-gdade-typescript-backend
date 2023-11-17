
import { Router } from "express";
import { 
    alteraCompleteJob,
    deleteMoveToInactive, 
    findAllJobs, 
    findJobById, 
    registerJob, 
    searchJobs 
} from "../controllers/jsonController";

const router = Router();

router.get("/jobs", findAllJobs);
router.post("/jobs", registerJob);

router.get("/jobs/searchjobs", searchJobs);

router.get("/jobs/:id", findJobById);
router.patch("/jobs/:id", alteraCompleteJob);

router.delete("/jobs/:id", deleteMoveToInactive);

export { router };