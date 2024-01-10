const { User } = require("../../../../app/models")
const salt = 10
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { sendMail } = require("@3rdplanet/x-core/mailer")

/**
 * Generate token string
 * @param user
 * @returns {Promise<string>}
 * @private
 */
const _generateTokenString = async (user) => {
    return (user.email + ":" + user.first_name + " " + user.last_name).toString().toLowerCase()
}

/**
 * Generate token
 * @param user
 * @returns {Promise<String>}
 * @private
 */
const _generateToken = async (user) => {
    return await bcrypt.hash(await _generateTokenString(user), salt)
}

/**
 * Send verification email
 * @param user {User}
 * @returns {Promise<void>}
 */
const verificationEmail = async (user) => {
    let token = await _generateToken(user)

    sendMail("email_verification", {
        to: user.email,
        subject: "Email Verification",
        replacer: {
            userName: user.first_name + " " + user.last_name,
            verificationLink: process.env.APP_URL + "/user/verify-email?token=" + token + "&email=" + user.email
        },
        module: "auth"
    }).then(() => {})
}

/**
 *
 * @param userData {{password: *, last_name: *, first_name: *, email: *}}
 * @returns {Promise<User>}
 */
exports.storeUser = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, salt)

    let user = await User.create(userData)

    verificationEmail(user).then(() => {})

    return user
}

/**
 * Get user by email
 * @param email
 * @param attrs {Array}
 * @throws Error
 * @returns {Promise<User>}
 */
exports.getUserByEmail = async (email, attrs = []) => {
    let queryOptions = { where: { email: email } }

    if (attrs.length > 0) queryOptions.attributes = attrs

    let user = await User.findOne(queryOptions)

    if (!user) throw new Error("User not found.")

    return user
}

/**
 * Verify email
 * @param token
 * @param email
 * @returns {Promise<User>}
 */
exports.verifyEmail = async (token, email) => {
    let user = await this.getUserByEmail(email)

    if (user.email_verified_at) throw new Error("Email already verified.")

    if (!user) throw new Error("User not found.")

    let isVerified = await bcrypt.compare(await _generateTokenString(user), token)

    if (!isVerified) throw new Error("Invalid token.")

    user.email_verified_at = new Date()
    await user.save()

    return user
}

/**
 * Login
 * @param email
 * @param password
 * @returns {Promise<*>}
 */
exports.login = async (email, password) => {
    let user = await this.getUserByEmail(email, ["first_name", "last_name", "email", "password"])

    if (!user) throw new Error("Invalid credentials.")

    let isVerified = await bcrypt.compare(password, user.password)

    if (!isVerified) throw new Error("Invalid credentials.")

    return {
        ...user.toJSON(),
        token: jwt.sign(
            {
                data: user.toJSON(),
                expiresIn: process.env.JWT_EXPIRES_IN
            },
            process.env.JWT_SECRET
        )
    }
}
