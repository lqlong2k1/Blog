import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userMiddleware from '../middlewares/user.middleware';
import adminMiddleware from '../middlewares/admin.middware';
import userController from '../controllers/user.controller';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          -id
 *          -username
 *          -password
 *          -full_name
 *          -email
 *          -phone_number
 *          -country
 *          -dob
 *          -address
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *           required: true
 *         username:
 *           type: string
 *           description: Username to login of the user
 *           required: true
 *         password:
 *           type: string
 *           description: password to login of the user
 *           required: true
 *         full_name:
 *           type: string
 *           description: The name of user
 *           required: true
 *         profile_img:
 *           type: string
 *           description: The link to profile image
 *           required: false
 *         email:
 *           type: string
 *           description: The email of user
 *           required: true
 *         phone_number:
 *           type: string
 *           description: the phone number of the user
 *           required: true
*         country:
 *           type: string
 *           description: the country of the user
 *           required: true
 *         dob:
 *           type: Date
 *           description: the birthday of user
 *           required: true
 *         role_id:
 *           type: number
 *           description: the role ID of the user
 *           required: false
 *         refreshToken:
 *           type: string
 *           description: the refresh token of the user
 *           required: false
 *         date_created:
 *           type: Date
 *           description: The date and time when the user was created
 *           required: false
 *       example:
 *           id: 4,
 *           username: admintrator,
 *           password: $2b$10$jl2OwupFesqBPjj7yXvnB.jmfcEMsly4ZXqRQ0gb2hhIgL9B8sQpi,
 *           full_name: Admintrator,
 *           profile_img: null,
 *           email: admin@gmail.com,
 *           phone_number: 029 154 1111,
 *           country: Viet Nam,
 *           dob: 1981-01-02T00:00:00.000Z,
 *           date_created: 2022-11-07T05:21:18.000Z,
 *           role_id: 1,
 *           refresh_token: byy1Pz5p6e5kzrcG9BtMUgmOx21KcZcOFg6S0QE7fcJLB5kV4mZPI6k88mSSe13hc8zOBt42S0kmYCmXO0ycOcLiri4sAJAbtJvI
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     tags: 
 *       - User
 *     summary: Get the list of all users
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userMiddleware.authenToken, userController.allUsers);

/**
 * @swagger
 * /users/:
 *   post:
 *     tags: 
 *       - Authentication
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             username: longlq,
 *             password: 123456789,
 *             full_name: Le Quang Long,
 *             email: lqlong2@gmail.com,
 *             phone_number: 029 222 1111,
 *             country: Viet Nam,
 *             dob: 2001-01-01          
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/', [validate(userValidation.createUser, { keyByField: true }, {}), userMiddleware.checkDuplicateUsername, userMiddleware.checkDuplicatePhoneNumber, userMiddleware.checkDuplicateEmail], userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: 
 *       - Authentication
 *     summary: User login 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example: 
 *              username: admintrator
 *              password: 123456789
 *     responses:
 *       200:
 *         description: The user login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/login', userController.login);

router.post('/logout', userMiddleware.authenToken, userController.logout);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: 
 *       - User
 *     summary: Get user information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Detail user information by user ID
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/:id', userMiddleware.authenToken, userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: 
 *       - User
 *     summary: Update user information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.put('/:id', userMiddleware.authenToken, userMiddleware.checkUserAuthentication, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: 
 *       - User
 *     summary: Delete user information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.delete('/:id', userMiddleware.authenToken, adminMiddleware.checkAdminAuthentication, userController.removeUserById)
router.post('/refresh-token', userMiddleware.authenToken, userController.refreshToken);
export default router; 
