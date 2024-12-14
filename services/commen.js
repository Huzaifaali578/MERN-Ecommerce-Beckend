import passport from "passport"
export function isAuth(req, res, done) {
    return passport.authenticate('jwt')
};

export function sanitizeUser(user) {
    return { id: user.id, role: user.role }
};

export const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // TODO: after testing we will remove this token
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWE5NDUyOTcwZWEyYjM1YWNkZTQ1NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNDExODg3Nn0.M0iYJPKvgHZ6hxKKJvxGTUTWTaaWDEti33MaNiQ_uJM"
    return token;
};