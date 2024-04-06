import express from "express";
const router=express.Router();

import {login, profile, register} from "../controller/Auth.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

router.post('/login', login);
router.post('/register', register);
router.get('/profile', verifyToken,profile);

export default router;
// module.exports = router;