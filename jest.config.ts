import { createDefaultEsmPreset, createDefaultPreset } from 'ts-jest'

export default {
  ...(process.env.TEST_DIST === 'esm' ?
      createDefaultEsmPreset({tsconfig: 'tsconfig.esm.json', diagnostics: { ignoreCodes: ['TS151001'] }}) :
      createDefaultPreset()),
  ...(!process.env.TEST_DIST ? {
      moduleNameMapper: {
          '^(.+)\\.js$': '$1',
      }
    } : {}),
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/test-apps/"],
}
