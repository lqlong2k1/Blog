"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT_VALUE = exports.NUMBER_REGEX = exports.EMAIL_REGEX = exports.LINK_IMAGE_REGEX = exports.PHONE_NUMBER_REGEX = exports.NAME_REGEX = exports.USERNAME_REGEX = void 0;
exports.USERNAME_REGEX = /^[a-zA-Z0-9]+$/;
exports.NAME_REGEX = /^[a-z A-Z]+$/;
exports.PHONE_NUMBER_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
exports.LINK_IMAGE_REGEX = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/;
exports.EMAIL_REGEX = /^([a-zA-Z][a-zA-Z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
exports.NUMBER_REGEX = /^[0-9]*$/;
exports.SALT_VALUE = 10;
//action user:
// export const CREATE = 'create'
// export const VIEW = 'view'
// export const UPDATE ='update'
// export const DELETE = 'delete'
// export const FULL_ROLES = 'full_roles'
