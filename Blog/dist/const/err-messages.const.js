"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_BLOG_FAIL = exports.UPDATE_BLOG_FAIL = exports.NOT_FOUND_BLOG = exports.NO_TOKEN_PROVIED = exports.NOT_PERMISSION = exports.CREATE_ACCESS_TOKEN_FAIL = exports.ACCESS_TOKEN_INVALID = exports.REFRESH_TOKEN_INVALID = exports.NOT_FOUND_REFRESH_TOKEN = exports.NOT_FOUND_ACCESS_TOKEN = exports.FAIL_REGISTER = exports.UPDATE_USER_FAIL = exports.NOT_FOUND_USER = exports.CAN_NOT_REMOVE = exports.REMOVED_USER_FAIL = exports.LOGIN_FAIL_ACCESS_TOKEN = exports.LOGIN_FAIL_USERNAME = exports.LOGIN_FAIL_PASSWORD = exports.INVALID_CATEGORY_ID = exports.INVALID_CONTENT_BLOG = exports.INVALID_TITLE_BLOG = exports.EXIST_EMAIL = exports.INVALID_EMAIL = exports.INVALID_LINK_IMAGE = exports.INVALID_FORMAT_BIRTHDAY = exports.INVALID_MINIMUN_BIRTHDAY = exports.INVALID_COUNTRY = exports.EXIST_PHONE_NUMBER = exports.INVALID_PHONE_NUMBER = exports.INVALID_NAME = exports.INVALID_PASSWORD = exports.EXIST_USERNAME = exports.MINIMUM_LENGTH_USERNAME = exports.INVALID_USERNAME = exports.INVALID_ID = void 0;
exports.INVALID_ID = 'Invalid ID user';
exports.INVALID_USERNAME = 'Invalid username';
exports.MINIMUM_LENGTH_USERNAME = 'Minimum username length is 6 characters.';
exports.EXIST_USERNAME = 'Failed! Username is already in use!';
exports.INVALID_PASSWORD = 'Password is at least 8 characters';
exports.INVALID_NAME = 'Invalid name';
exports.INVALID_PHONE_NUMBER = 'Invalid phone number';
exports.EXIST_PHONE_NUMBER = 'Failed! Phone number is already in use!';
exports.INVALID_COUNTRY = 'Country field is required';
exports.INVALID_MINIMUN_BIRTHDAY = 'Age must be 18+';
exports.INVALID_FORMAT_BIRTHDAY = 'Date format is YYYY-MM-DD';
exports.INVALID_LINK_IMAGE = 'Invalid image link';
exports.INVALID_EMAIL = 'Invalid email';
exports.EXIST_EMAIL = 'Failed! Email is already in use!';
exports.INVALID_TITLE_BLOG = 'Invalid title';
exports.INVALID_CONTENT_BLOG = 'Invalid content';
exports.INVALID_CATEGORY_ID = 'Invalid category ID';
//Login error:
exports.LOGIN_FAIL_PASSWORD = 'Invalid password';
exports.LOGIN_FAIL_USERNAME = 'User does not exist';
exports.LOGIN_FAIL_ACCESS_TOKEN = 'Login fail';
//Remove user:
exports.REMOVED_USER_FAIL = 'Remove user fail';
exports.CAN_NOT_REMOVE = 'FAIL! Not found this user';
//Search user by ID:
exports.NOT_FOUND_USER = 'Not found user';
//update user:
exports.UPDATE_USER_FAIL = 'Update user fail';
// register new user:
exports.FAIL_REGISTER = 'Oops! Something had fail in process to create new user';
//token
exports.NOT_FOUND_ACCESS_TOKEN = 'Not found access token';
exports.NOT_FOUND_REFRESH_TOKEN = 'Not found refresh token';
exports.REFRESH_TOKEN_INVALID = 'Refresh token invalid';
exports.ACCESS_TOKEN_INVALID = 'Access token invalid';
exports.CREATE_ACCESS_TOKEN_FAIL = 'Create access token fail';
exports.NOT_PERMISSION = 'Sorry! You are not authorized to perform this action.';
exports.NO_TOKEN_PROVIED = 'No token provided';
//blog
exports.NOT_FOUND_BLOG = 'Not found blog';
exports.UPDATE_BLOG_FAIL = 'Update blog fail';
exports.REMOVE_BLOG_FAIL = 'Remove blog fail';
