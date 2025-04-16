import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

const userController = new UserController();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUser);
router.patch("/users", userController.updateUser);
router.delete("/users/:id", userController.deleteuser);

export default router;