/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: 'http://localhost:3001/api-json',
  apiFile: './src/features/api/base.ts',
  apiImport: 'baseApiSlice',
  outputFile: './generated_apis/default.ts',
  outputFiles: {
    './generated_apis/user.ts': {
      filterEndpoints: [/^user/],
    },
    './generated_apis/class.ts': {
      filterEndpoints: [/^class/],
    },
    './generated_apis/feed.ts': {
      filterEndpoints: [/^feed/],
    },
    './generated_apis/post.ts': {
      filterEndpoints: [/^post/],
    },
    './generated_apis/auth.ts': {
      filterEndpoints: [/^auth/],
    },
  },
  hooks: true,
};

module.exports = config;
