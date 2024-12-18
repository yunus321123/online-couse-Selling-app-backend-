import { Router } from "express";
import { getProfile, login, logout, register } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router=Router()
router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/getProfile',isLoggedIn, getProfile)



export default router;
