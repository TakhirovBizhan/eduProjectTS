import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  //collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // Добавь этот блок для поддержки TypeScript
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  // Укажи расширения файлов, которые Jest должен понимать
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node', // или 'jsdom' в зависимости от окружения
};

export default config;
