import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userMiddleware from '../middlewares/user.middleware';
import adminMiddleware from '../middlewares/admin.middware';
import userController from '../controllers/user.controller';
const router = express.Router();

router.get('/', userMiddleware.authenToken, adminMiddleware.checkAdminAuthentication, userController.allUsers);
router.post('/', [validate(userValidation.createUser, { keyByField: true }, {}), userMiddleware.checkDuplicateUsername, userMiddleware.checkDuplicatePhoneNumber, userMiddleware.checkDuplicateEmail], userController.createUser);
router.post('/login', userController.login);
router.post('/logout', userMiddleware.authenToken, userController.logout);
router.get('/:id', userMiddleware.authenToken, userController.getUserById);
router.put('/:id', userMiddleware.authenToken, userMiddleware.checkUserAuthentication, userController.updateUser);
router.delete('/:id', userMiddleware.authenToken, adminMiddleware.checkAdminAuthentication, userController.removeUserById)
router.post('/refresh-token', userMiddleware.authenToken, userController.refreshToken);
export default router; 
