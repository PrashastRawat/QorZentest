export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function validateRequired(fields) {
  const errors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (!String(value || "").trim()) errors[key] = "This field is required";
  });
  return errors;
}
