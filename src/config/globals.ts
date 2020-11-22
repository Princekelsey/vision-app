export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  NODE_PORT: process.env.NODE_PORT || process.env.PORT || 5000,
  TEST_PORT: process.env.TEST_PORT || 5500,
};
