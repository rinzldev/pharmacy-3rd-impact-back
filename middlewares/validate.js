const bcrypt = require('bcryptjs')

function comparePassword(pass, encrypt) {
  return bcrypt.compare(pass, encrypt)
}

module.exports = {
  comparePassword
}