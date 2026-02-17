export function validateRegister(form: any) {
  const errors: any = {};

  if (!form.name || form.name.trim().length < 2)
    errors.name = "Name is required";

  if (!form.email)
    errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Invalid email";

  if (!form.password || form.password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return errors;
}
