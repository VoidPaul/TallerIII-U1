import { body, param } from "express-validator"
import { companyExists } from "../helpers/database-validator.js"
import { validateJWT } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { handleErrors } from "./error-handler.js"

export const addCompanyValidator = []
