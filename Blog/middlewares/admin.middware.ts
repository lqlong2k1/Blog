import { Request, Response, NextFunction } from 'express';
import * as errMessage from '../const/err-messages.const';
import prisma from '../utils/prisma';

const adminMiddleware = {
    checkAdminAuthentication: async (req: any, res: Response, next: NextFunction) => {
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
        if (data.role_id === 1) {
            req.admin = data;
            console.log("===> MIDDLEWARE ADMIN INFOR:  ", req.admin);
            next();
        } else {
            return res.json({ message: errMessage.NOT_PERMISSION });
        }
    }

}
export default adminMiddleware;
