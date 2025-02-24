import { Router } from "express"
import { getUserById, updateUser, updatePassword } from "./user.controller.js"
import {
  getUserByIdValidator,
  updateUserValidator,
  updatePasswordValidator,
} from "../middleware/validate-user.js"

const router = Router()

router.get("/profile/:uid", getUserByIdValidator, getUserById)

router.put("/update", updateUserValidator, updateUser)

router.patch("/update/password", updatePasswordValidator, updatePassword)

export default router
