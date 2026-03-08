export const cleanParams = (params?: any) => {
  return Object.fromEntries(
    Object.entries(params || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
};