import { body, param } from "express-validator"
import { companyExists } from "../helpers/database-validator.js"
import { validateJWT } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { handleErrors } from "./error-handler.js"

export const addCompanyValidator = [
  body("name", "Company name required.").notEmpty(),
  body("address", "Company address required.").notEmpty(),
  body("email", "Enter a valid e-mail.").notEmpty().isEmail(),
  body("phone", "Phone number required.").notEmpty(),
  body("impact", "Impact level requried (ALTO, MEDIO, BAJO).").notEmpty(),
  body("foundationDate", "Enter a valid date.").notEmpty().isDate({ format: "YYYY-MM-DD" }),
  body("category", "Company business category required.").notEmpty(),
  validateFields,
  handleErrors,
]

export const updateCompanyValidator = [
  validateJWT,
  param("id", "Not a valid MongoDB ID").isMongoId(),
  param("id", "Company not registered or doesn't exist").custom(companyExists),
  body("email", "Enter a valid e-mail.").optional().isEmail(),
  body("foundationDate", "Enter a valid date.").optional().isDate({ format: "YYYY-MM-DD" }),
  validateFields,
  handleErrors,
]
