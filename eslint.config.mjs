import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, 
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Add custom rules or override defaults here
      'object-curly-newline': [
        'error',
        {
          'ObjectExpression': {
            'multiline': true, 'minProperties': 1 
          },
          'ObjectPattern': {
            'multiline': true, 'minProperties': 1 
          },
          'ImportDeclaration': {
            'multiline': true, 'minProperties': 3 
          },
          'ExportDeclaration': {
            'multiline': true, 'minProperties': 3 
          }
        }
      ],
      'max-len': ['warn', {
        'code': 150, 'tabWidth': 2, 'ignoreUrls': true 
      }],
      'no-unused-vars': ['warn'], // Warn on unused variables
      'semi': ['error', 'always'], // Require semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      'indent': ['error', 2], // Enforce 2-space indentation
      'eqeqeq': ['error', 'always'], // Require `===` and `!==`
      'no-console': 'off', // Allow console.log() for debugging
      'object-curly-spacing': ['error', 'always'], // Enforces spaces inside curly braces
      'key-spacing': ['error', {
        'beforeColon': false, 'afterColon': true 
      }]
    }
  }
];

export default eslintConfig;
