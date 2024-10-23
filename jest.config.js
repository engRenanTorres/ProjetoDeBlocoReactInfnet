module.exports = {
  testEnvironment: "jsdom", // Ambiente de teste similar ao navegador
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Carrega o setupTests.js antes dos testes
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Lida com imports de CSS
  },
  testPathIgnorePatterns: ["/node_modules/"], // Ignora a pasta node_modules
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Usa o babel-jest para transformar arquivos JS/JSX
  },
};
