import express from 'express';
import userController from '../controllers/userController.js';
import { authorisedRoles, isAuthanticatedUser } from '../middlewares/auth.js';

const userRouter = express.Router();


userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/logout', userController.logoutUser);
userRouter.get('/myProfile', isAuthanticatedUser, userController.getUserDetail);
userRouter.put('/myProfile/update', isAuthanticatedUser, authorisedRoles("admin"), userController.updateProfile);
userRouter.get('/admin/users', isAuthanticatedUser, authorisedRoles("admin"), userController.getAllUsers);
userRouter.get('/admin/user/:id', isAuthanticatedUser, authorisedRoles("admin"), userController.getSingleUser);
userRouter.put('/admin/user/:id', isAuthanticatedUser, authorisedRoles("admin"), userController.updateRole);
userRouter.delete('/admin/user/:id', isAuthanticatedUser, authorisedRoles("admin"), userController.deleteUser);
userRouter.delete('/user/:id', isAuthanticatedUser, userController.deleteUser);

export default userRouter;