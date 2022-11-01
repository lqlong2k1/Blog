export interface IUser {
    readonly id?: number;
    username: string;
    password: string;
    full_name: string;
    profile_img?: string;
    email: string;
    phone_number: string;
    country: string;
    dob: Date;
    role_id?: number;
    refreshToken?: string;
    date_created?: Date;
}
