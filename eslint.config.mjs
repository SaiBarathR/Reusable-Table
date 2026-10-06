import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Existing components predate these React Compiler rules; surface them without failing lint
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  { ignores: ["out/**"] },
];

export default eslintConfig;
