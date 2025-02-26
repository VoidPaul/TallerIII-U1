import { Router } from "express"
import {
  addCompanyValidator,
  getCompanyByIdValidator,
  getCompaniesValidator,
  updateCompanyValidator,
} from "../middleware/validate-company.js"
import { addCompany, getCompanyById, getCompanies, updateCompany } from "./company.controller.js"

const router = Router()

router.post("/add", addCompanyValidator, addCompany)

router.get("/list", getCompaniesValidator, getCompanies)

router.get("/:id", getCompanyByIdValidator, getCompanyById)

router.put("/edit", updateCompanyValidator, updateCompany)

export default router
