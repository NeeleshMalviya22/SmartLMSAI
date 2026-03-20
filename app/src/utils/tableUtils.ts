import type React from "react";

export interface TableParams {
  page: number;
  pageSize: number;
  total: number;
  sortBy: string;
  sortOrder: "" | "asc" | "desc";
}

export const defaultTableParams: TableParams = {
  page: 1,
  pageSize: 10,
  total: 0,
  sortBy: "",
  sortOrder: "",
};

import type { SorterResult } from "antd/es/table/interface";

export const handleAntTableChange = <T extends unknown>(
  pagination: { current?: number; pageSize?: number },
  sorter: SorterResult<T> | SorterResult<T>[],
  setTableParams: React.Dispatch<React.SetStateAction<TableParams>>
) => {
  const firstSorter = Array.isArray(sorter) ? sorter[0] : sorter;
  const field = firstSorter?.field;
  const order = firstSorter?.order;

  setTableParams((prev) => ({
    ...prev,
    page: pagination.current ?? prev.page,
    pageSize: pagination.pageSize ?? prev.pageSize,
    sortBy: typeof field === "string" ? field : field !== undefined ? String(field) : "",
    sortOrder:
      order === "ascend"
        ? "asc"
        : order === "descend"
        ? "desc"
        : "",
  }));
};