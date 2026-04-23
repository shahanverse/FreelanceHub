export const authorizeRoles = (...roles) => {
      return (req, res, next) => {

            // check if logged in user's role is allowed
            if (!roles.includes(req.user.role)) {
                  return res.status(403).json({
                        message: "Access denied - not authorized"
                  })
            }
            next()
      }
}