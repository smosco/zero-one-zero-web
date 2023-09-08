module.exports = {
  '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,yaml,yml,xml,html,md,css}': [
    (files) => files.map((file) => `prettier "${file}" --write`),
  ],
  'src/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': [
    (files) => files.map((file) => `prettier "${file}" --write`),
    (files) => files.map((file) => `eslint "${file}" --fix`),
  ],
};
