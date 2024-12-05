import express from 'express'
import { registerController, loginController, testController, forgotPasswordController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object 
const router = express.Router()

// routing
//REGISTER || METHOD POST
router.post('/register', registerController)

// Login Route
router.post('/login', loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);


// test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;