import { Router } from "express";
import { getProfile, login, logout, register } from "../controller/user.controller.js";
const router=Router()
router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/getProfile',getProfile)



export default router;