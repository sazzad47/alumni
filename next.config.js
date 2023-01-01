const nextConfig = {
  env: {
     "BASE_URL": process.env.NODE_ENV==='production'? "https://alumni-pied.vercel.app/": "http://localhost:3000",
     "MONGODB_URL": process.env.MONGODB_URL,
     "SENDER_EMAIL": process.env.SENDER_EMAIL,
     "SENDER_EMAIL_PASSWORD": process.env.SENDER_EMAIL_PASSWORD,
     "EMAIL_SERVICE": process.env.EMAIL_SERVICE,
     "EMAIL_PORT": process.env.EMAIL_PORT,
  }
}

module.exports = nextConfig
