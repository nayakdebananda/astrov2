const Token = require("../services/Token")

function verifySocketUser(socket, next) {
  let token = socket.handshake.headers?.authorization
  if (!token) return next(new Error("Authentication failed"))
  token = token.split(" ")
  if (token[0] !== "Bearer") return next(new Error("Authentication failed"))
  if (!token[1]) return next(new Error("Authentication failed"))
  try {
    const data = Token.verifyAccessToken(token[1])
    socket.user = data
    console.log(data)
    const userId = socket.user.id
    const userRole = socket.user.role
    socket.room = `${userRole}-${userId}`
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = verifySocketUser
