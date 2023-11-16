const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const publicRoutes = [
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/validate',
  ]

  if (publicRoutes.includes(req.path)) {
    return next()
  }

  const token = req.cookies.token

  if (!token) return res.status(401).send('Åtkomst nekad.')

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Åtkomst nekad. Fel token.')

    req.user = user
    next()
  })
}

const checkToken = (req, res) => {
  const { token } = req.body

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Åtkomst nekad. Inget token.', valid: false })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: 'Åtkomst nekad. Fel token.', valid: false })

    res.status(200).json({ message: 'Token validerad.', user, valid: true })
  })
}

module.exports = { authenticateToken, checkToken }
