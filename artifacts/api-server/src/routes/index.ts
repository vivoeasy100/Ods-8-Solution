import { Router, type IRouter } from "express";
import healthRouter from "./health";
import companiesRouter from "./companies";
import indicatorsRouter from "./indicators";
import employeesRouter from "./employees";
import trainingsRouter from "./trainings";
import dashboardRouter from "./dashboard";
import resumesRouter from "./resumes";

const router: IRouter = Router();

router.use(healthRouter);
router.use(companiesRouter);
router.use("/companies/:companyId/indicators", indicatorsRouter);
router.use("/companies/:companyId/employees", employeesRouter);
router.use("/companies/:companyId/trainings", trainingsRouter);
router.use(dashboardRouter);
router.use(resumesRouter);

export default router;
