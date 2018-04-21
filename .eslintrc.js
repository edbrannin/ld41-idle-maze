module.exports = {
  "extends": [
    "standard",
    "plugin:react/recommended",
  ],
  "plugins": [
    "jest",
    "react",
  ],
  "env": {
    "jest": true,
    "browser": true,
  },
  "rules": {
    "react/prop-types": "off", // Temporary
    "react/jsx-filename-extension": "off",
    "comma-dangle": ["error", "always-multiline"],
  }
};
