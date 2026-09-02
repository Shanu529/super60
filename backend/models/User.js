const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    // Authorization is entirely database-driven: a normal signup always
    // creates role "user". The ONLY way an account becomes "admin" is by
    // a MongoDB document edit — there is no public API path that lets a
    // caller set their own role. protect/adminOnly middleware re-reads
    // this field from the DB on every request, so a role change takes
    // effect the next time that user authenticates/validates a token.
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

module.exports = mongoose.model('User', userSchema)
