export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE,
  },
});
