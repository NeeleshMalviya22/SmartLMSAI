export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
}

export function validateRegister(form: RegisterValues): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = "Name is required";
  }

  if (!form.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Invalid email";
  }

  if (!form.password || form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}
