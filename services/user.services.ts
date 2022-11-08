import { IUser } from '../interface/user.interface';
import * as userConst from '../const/user.const';
import * as errMessage from '../const/err-messages.const';
import * as successMessage from '../const/success-messages.const';
import * as methodAuthentication from '../authentication/methods.authentication';
import randToken from 'rand-token';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import prisma from "../utils/prisma";

dotenv.config();

export async function getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
}

export async function getUserById(id: number) {
    const user = await prisma.users.findFirst({
        where: {
            id: id
        }
    })
    if (!user) {
        return errMessage.NOT_FOUND_USER;
    }
    return user;
}

async function hashPassword(password: string) {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(userConst.SALT_VALUE);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);
    return password;
}

export async function createUser({ username, password, dob, ...rest }: IUser) {
    const passwordHashed = await hashPassword(password);
    const user = await prisma.users.create({
        data: {
            ...rest,
            username: username.toLowerCase(),
            password: passwordHashed,
            dob: new Date(dob),
        }
    })
    return user;
}

export async function updateUser(id: number, { dob, ...rest }: IUser) {
    const isUser = await prisma.users.findFirst({
        where: {
            id: id
        }
    })
    if (!isUser) {
        return errMessage.NOT_FOUND_USER;
    }
    const userUpdated = await prisma.users.update({
        where: {
            id: id
        },
        data: {
            ...rest,
            dob: new Date(dob)
        }
    });
    if (!userUpdated) {
        errMessage.UPDATE_USER_FAIL;
    }
    return userUpdated;
}

export async function removeUserById(id: number) {
    const user = await prisma.users.findFirst({
        where: {
            id: id
        }
    })
    if (!user) {
        return errMessage.NOT_FOUND_USER;
    }
    const isRemoved = await prisma.users.delete({
        where: {
            id: id
        }
    })
    if (!isRemoved) return errMessage.REMOVED_USER_FAIL;
    return successMessage.REMOVED_USER_SUCCESS;
}

export async function login(username: string, password: string) {
    const user = await prisma.users.findFirst({ where: { username: username.toLowerCase() } });
    if (!user) {
        return {
            'message': errMessage.LOGIN_FAIL_USERNAME
        }
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return {
            'message': errMessage.LOGIN_FAIL_PASSWORD
        }
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        username,
        password
    };
    const accessToken = await methodAuthentication.getToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    console.log('ACCESS TOKEN: ' + accessToken);

    if (!accessToken) {
        return {
            'message': errMessage.LOGIN_FAIL_ACCESS_TOKEN
        }
    }

    // create a refresh token ngẫu nhiên
    let refresh_token = randToken.generate(Number(process.env.REFRESH_TOKEN_SIZE));
    if (!user.refresh_token) {
        //If user haven't refresh token yet -> save this refresh token into database
        await methodAuthentication.updateRefreshToken(user.username, refresh_token);
    } else {
        refresh_token = user.refresh_token;
    }
    if (user.role_id === 1) {
        return {
            'message': successMessage.LOGIN_SUCCESS_ADMIN,
            'access-token': accessToken,
            'refresh-token': refresh_token
        }
    } else {
        return {
            'message': successMessage.LOGIN_SUCCESS_USER,
            'access-token': accessToken,
            'refresh-token': refresh_token
        }
    }
}

export async function refreshToken(accessToken: string, refreshToken: string) {
    if (!accessToken) return {
        'message': errMessage.NOT_FOUND_ACCESS_TOKEN
    }
    if (!refreshToken) return {
        'message': errMessage.NOT_FOUND_REFRESH_TOKEN
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

    const decoded = await methodAuthentication.decodeToken(accessToken, accessTokenSecret);
    if (!decoded) {
        return {
            'message': errMessage.ACCESS_TOKEN_INVALID
        }
    }

    const username: string = decoded.payload.username;
    const password: string = decoded.payload.password;

    const user = await prisma.users.findFirst({
        where: {
            username: username
        }
    });
    if (!user) {
        return {
            'message': errMessage.NOT_FOUND_USER
        }
    }

    if (refreshToken !== user.refresh_token) {
        return {
            'message': errMessage.REFRESH_TOKEN_INVALID
        }
    }
    const dataForAccessToken = {
        username,
        password
    }

    const newAccessToken = await methodAuthentication.getToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    )

    if (!newAccessToken) {
        return {
            'message': errMessage.CREATE_ACCESS_TOKEN_FAIL
        }
    }

    return { 'new-access-token': newAccessToken };
}

