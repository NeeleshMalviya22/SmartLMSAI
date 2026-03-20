import type { Rule } from "antd/es/form";

export const validationRules = {
  required: (fieldName: string): Rule => ({
    required: true,
    message: `Please enter ${fieldName.toLowerCase()}`,
  }),

  requiredSelect: (fieldName: string): Rule => ({
    required: true,
    message: `Please select ${fieldName.toLowerCase()}`,
  }),

  email: (): Rule => ({
    type: "email",
    message: "Please enter a valid email",
  }),

  minLength: (min: number): Rule => ({
    min,
    message: `Must be at least ${min} characters`,
  }),

  maxLength: (max: number): Rule => ({
    max,
    message: `Cannot exceed ${max} characters`,
  }),

  passwordMatch: (): Rule => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, number, and symbol",
  }),
};

export const createFieldRules = (fieldName: string, options?: { required?: boolean; email?: boolean; min?: number; max?: number }): Rule[] => {
  const rules: Rule[] = [];

  if (options?.required) {
    rules.push(validationRules.required(fieldName));
  }

  if (options?.email) {
    rules.push(validationRules.email());
  }

  if (options?.min) {
    rules.push(validationRules.minLength(options.min));
  }

  if (options?.max) {
    rules.push(validationRules.maxLength(options.max));
  }

  return rules;
};
