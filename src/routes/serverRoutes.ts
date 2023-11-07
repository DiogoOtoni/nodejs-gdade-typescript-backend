
import { Router } from "express";
import { 
    alteraCompleteJob, 
    alteraStatusDescription, 
    deleteMoveToInactive, 
    findAllJobs, 
    findJobById, 
    registerJob, 
    searchJobs 
} from "../controllers/jsonController";

const router = Router();

router.get("/jobs", findAllJobs);
router.post("/jobs", registerJob);

router.get("/searchjobs", searchJobs);

router.get("/jobs/:id", findJobById);
router.patch("/jobs/:id", alteraCompleteJob);

router.patch("/jobs/del/:id", deleteMoveToInactive);

router.patch("/jobs/status/:id", alteraStatusDescription);


export { router };