const cloudinary = require('cloudinary').v2

// Explicit config is required — without this call the SDK has no
// credentials and every upload silently fails (or throws "Must supply
// api_key"). Supports either three separate env vars, or a single
// CLOUDINARY_URL (cloudinary://key:secret@cloud_name), which the SDK
// picks up automatically if CLOUDINARY_CLOUD_NAME etc. aren't set.
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
} else if (!process.env.CLOUDINARY_URL) {
  // Neither the three discrete vars nor CLOUDINARY_URL are set — fail
  // loudly at startup instead of letting every upload 500 with a
  // confusing error later.
  console.warn(
    '[cloudinary] No Cloudinary credentials found in the environment. ' +
      'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET ' +
      '(or CLOUDINARY_URL) in backend/.env — image uploads will fail until then.'
  )
}

module.exports = cloudinary
