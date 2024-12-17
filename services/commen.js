import passport from "passport"
export function isAuth(req, res, done) {
    return passport.authenticate('jwt')
};

export function sanitizeUser(user) {
    return { id: user.id, role: user.role }
};

export const cookieExtractor = function(req) {
    let token = null;
    // console.log("cookieExtractor", req)
    
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // console.log("cookieExtractor", token)
    return token;
};