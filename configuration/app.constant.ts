export const APP_CONSTANTS = {
    JWT_EXP_TIME: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
};

export const USER_ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}


export const USER_GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
}
