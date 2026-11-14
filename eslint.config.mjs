import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// ESLint 9 and Next build must share native flat config.
// Preserve the existing .eslintrc.json rules without weakening them.
export default [
  ...nextVitals.map(config => config.name === "next"
    ? { ...config, files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"] }
    : config),
  ...nextTypescript,
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  { rules: {
    "@typescript-eslint/no-unused-vars": [
        "warn",
        {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
        }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": [
        "warn",
        {
            "allow": [
                "warn",
                "error"
            ]
        }
    ],
    "prefer-const": "warn",
    "no-var": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error"
} },
];
