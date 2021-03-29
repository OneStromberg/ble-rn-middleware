{
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "flowtype"
  ],
  "rules": {
    "no-console": "off",
    "func-names": "off",
    "no-plusplus": "off",
    "no-bitwise": "off",
    "no-continue": "off",
    "semi": "error",
    "camelcase": 0,
    "arrow-parens": 0,
    "prefer-template": "warn",
    "prefer-destructuring": "warn",
    "no-restricted-properties": "warn",
    "comma-dangle": 0,
    "guard-for-in": 1,
    "import/no-cycle": 2,
    "import/default": 0,
    "import/no-unused-modules": 1,
    "import/first": 2,
    "import/exports-last": 0,
    "import/no-self-import": 2,
    "import/extensions": 0,
    "import/no-duplicates": 2,
    "import/no-extraneous-dependencies": 1,
    "import/named": 2,
    "import/namespace": 0,
    "import/no-unresolved": 2,
    "import/no-named-as-default": 2,
    "import/prefer-default-export": 0,
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    "jsx-a11y/interactive-supports-focus": 1,
    "max-len": 0,
    "new-cap": [2, {
      "capIsNewExceptions": ["List", "Map", "Set", "RNRestart.Restart", "Record"]
    }],
    "no-mixed-operators": 0,
    "no-alert": 1,
    "no-unused-vars": 1,
    "no-use-before-define": ["error", {
      "functions": false
    }],
    "jsx-a11y/accessible-emoji": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-filename-extension": 0,
    "react/no-multi-comp": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/destructuring-assignment": 0,
    "react/state-in-constructor": 0,
    "global-require": 0,
    "flowtype/no-types-missing-file-annotation": 0,
    "max-classes-per-file": 0
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "jest": true
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
}