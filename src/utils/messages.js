const ErrorMessage = Object.freeze({
    USER_ALREADY_EXIST: "User already exist.",
    EMAIL_ALREADY_IN_USE: "Email already in use",
    USER_NOT_FOUND:"User not found",
    INVALID_CREDENTIALS: "Invalid email or password.",
    VERIFY_ACCOUNT: "Please verify your account.",
    TOKEN_EXPIRED: "Token is invalid or expired",
    USER_ALREADY_VERIFIED: "This user has already been verified.",
    INVALID_USER_EMAIL: "There is no user with this email address.",
    VERIFY_USER_ACCOUNT: "Please verify your account in order to perform this action.",
    DUPLICATE_VALUE: "Duplicate field value: _VALUE_. Please use another value!",
    INVALID_TOKEN: "Invalid token. Please log in again!",
    LOGIN_TOKEN_EXPIRED: "Your token has expired! Please log in again.",
    USER_TOKEN: "The user belonging to this token no logger exist.",
    NOT_LOGIN: "You are not logged in.",
    CURRENT_PASSWORD_WRONG: "Your current password is wrong.",
    VALIDATION_ERROR:"Validation error!"
});

const SuccessMessage = Object.freeze({
    DATABASE_CONNECTED: "Database connected successfully.",
});

module.exports ={
    ErrorMessage,
    SuccessMessage,
};