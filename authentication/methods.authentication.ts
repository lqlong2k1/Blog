import jwt from 'jsonwebtoken';
import util from 'util';
import promisify = util.promisify;
import prisma from '../utils/prisma';

const asyncSign = promisify(jwt.sign).bind(jwt);
const asyncVerify = promisify(jwt.verify).bind(jwt);

export async function updateRefreshToken(username: string, refreshToken: string) {
    try {
        await prisma.users.update({
            where: {
                username: username
            },
            data: {
                refresh_token: refreshToken
            }
        })
        return true;
    } catch (error) {
        return false;
    }
}

export async function getToken(payload: any, secretSignature: any, tokenLife: string) {
    try {
        return await asyncSign({ payload }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        })
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
}

export async function decodeToken(token: string, secretKey: string) {
    try {
        return await asyncVerify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
}
