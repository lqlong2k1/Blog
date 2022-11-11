import { Request, Response, NextFunction } from 'express';
import * as errMessage from '../const/err-messages.const';
import * as userConst from '../const/user.const';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export default {
    async checkDuplicateUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await prisma.users.findFirst({
                where: { username: req.body.username }
            })
            if (user) {
                throw new Error(errMessage.EXIST_USERNAME);
            }
            next();
        } catch (error) {
            return res.status(400).send({ ERROR: error.message });
        }
    },

    async checkDuplicatePhoneNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const phoneNumber = await prisma.users.findFirst({
                where: { phone_number: req.body.phone_number }
            })
            if (phoneNumber) {
                throw new Error(errMessage.EXIST_PHONE_NUMBER)
            }
            next();
        } catch (error) {
            return res.status(400).send({ ERR: error.message });
        }

    },
    async checkValidateParams(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id.match(userConst.NUMBER_REGEX)) {
                throw new Error(errMessage.ID_MUST_BE_NUMBER)
            }
            next();
        } catch (error) {
            return res.status(400).send({ ERR: error.message });
        }
    },
    async checkDuplicateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = await prisma.users.findFirst({
                where: { email: req.body.email }
            })
            if (email) {
                throw new Error(errMessage.EXIST_EMAIL)
            }
            next();
        } catch (error) {
            return res.status(400).send({ ERR: error.message });
        }
    },

    authenToken(req: any, res: Response, next: NextFunction) {
        const token = req.headers['access-token'];

        if (!token) {
            res.status(401).json({ message: errMessage.NO_TOKEN_PROVIED });
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error, decoded: any) => {
                if (err) {
                    return res.json({ message: errMessage.ACCESS_TOKEN_INVALID });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    },

    checkUserAuthentication: async (req: any, res: Response, next: NextFunction) => {
        const username = req.decoded.payload.username;
        const data = await prisma.users.findFirst({
            where: {
                username: username
            },
            select: {
                id: true,
                role_id: true
            }
        })
        if (req.params.id == data.id || data.role_id === 1) {
            req.user = data;
            next();
        } else {
            return res.json({ message: errMessage.NOT_PERMISSION });
        }
    }
}
