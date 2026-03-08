export const defaultTableParams = {
  page: 1,
  pageSize: 10,
  total: 0,
  sortBy: "",
  sortOrder: "",
};

export const handleAntTableChange = (
  pagination: any,
  sorter: any,
  setTableParams: any
) => {
  const field = Array.isArray(sorter) ? sorter[0]?.field : sorter?.field;
  const order = Array.isArray(sorter) ? sorter[0]?.order : sorter?.order;

  setTableParams((prev: any) => ({
    ...prev,
    page: pagination.current,
    pageSize: pagination.pageSize,
    sortBy: field || "",
    sortOrder:
      order === "ascend"
        ? "asc"
        : order === "descend"
        ? "desc"
        : "",
  }));
};