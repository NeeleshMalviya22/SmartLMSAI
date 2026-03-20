export const cleanParams = (params?: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(params || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
};