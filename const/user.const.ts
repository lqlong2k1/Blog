import exp from "constants";

export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;
export const NAME_REGEX = /^[a-z A-Z]+$/;
export const PHONE_NUMBER_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const LINK_IMAGE_REGEX = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/
export const EMAIL_REGEX = /^([a-zA-Z][a-zA-Z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
export const NUMBER_REGEX =/^[0-9]*$/;
export const SALT_VALUE = 10;


//action user:
 
// export const CREATE = 'create'
// export const VIEW = 'view'
// export const UPDATE ='update'
// export const DELETE = 'delete'
// export const FULL_ROLES = 'full_roles'
