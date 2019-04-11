module.exports = {
    "roots": [
      "<rootDir>/"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testEnvironment": "node",
    "testPathIgnorePatterns": [
      "/node_modules/",
      "/production-server/"
    ],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }