import { Request, Response, NextFunction } from 'express';
import * as userServices from '../services/user.services';

const allUsers = async (req: Request, res: Response) => {
    try {
        const users = await userServices.getAllUsers();
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'list all users',
            data: users
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const user = await userServices.getUserById(userId);
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'get user by user ID',
            data: user
        })
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.createUser(req.body);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new user',
            data: user
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}
const login = async (req: Request, res: Response) => {
    try {
        const data = await userServices.login(req.body.username, req.body.password)
        if (data['refresh-token'] !== null) {
            res.cookie('refreshToken', data['refresh-token'], {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })
        }

        return res.json({
            method: 'POST',
            description: 'Login user',
            data: {
                'message': data.message,
                'accessToken': data['access-token']
            }
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id)
        const userData = req.body;
        const isUpdated = await userServices.updateUser(userId, userData);
        return res.json({
            method: 'PUT',
            status: 'success',
            description: 'Update user',
            data: isUpdated
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}

const removeUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const user = await userServices.removeUserById(userId);
        return res.json({
            method: 'DELETE',
            status: 'success',
            description: 'Delete user by user ID',
            data: user
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}

const refreshToken = async (req: Request, res: Response) => {
    try {
        const accessToken = req.headers['access-token'] as string;
        const refreshToken = req.cookies.refreshToken;

        console.log('------> test acc token: ', accessToken);
        console.log('------> test ref token: ', refreshToken)

        const newAccessToken = await userServices.refreshToken(accessToken, refreshToken);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new access token when the old access token had expired',
            data: newAccessToken

        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);

    }
}

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('refreshToken');

        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Log out',
            data: 'Logout successfully'
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}
export default {
    allUsers,
    getUserById,
    createUser,
    login,
    removeUserById,
    updateUser,
    logout,
    refreshToken
}
