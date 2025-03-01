import { Router } from "express"
import {
  addCompanyValidator,
  getCompanyByIdValidator,
  getCompaniesValidator,
  updateCompanyValidator,
  generateExcelReportValidator,
} from "../middleware/validate-company.js"
import { addCompany, getCompanyById, getCompanies, updateCompany, generateExcelReport } from "./company.controller.js"

const router = Router()

router.post("/add", addCompanyValidator, addCompany)

router.get("/list", getCompaniesValidator, getCompanies)

router.get("/report", generateExcelReportValidator, generateExcelReport)

router.get("/:id", getCompanyByIdValidator, getCompanyById)

router.put("/edit/:id", updateCompanyValidator, updateCompany)

export default router
