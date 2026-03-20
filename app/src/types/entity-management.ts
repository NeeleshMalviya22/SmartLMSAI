import type { ColumnsType, ExpandableConfig } from "antd/es/table/interface";
import type { BaseModalProps } from "./common-modal";

export interface FetchDataResult<T> {
  items: T[];
  totalCount: number;
}

export interface EntityManagementProps<T, E extends object> {
  title: string;
  columns: ColumnsType<T>;
  fetchData: (params: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "ascend" | "descend" | string;
  }) => Promise<FetchDataResult<T>>;
  createApi?: (data: any) => Promise<any>;
  updateApi?: (id: string, data: any) => Promise<any>;
  deleteApi?: (id: string) => Promise<any>;
  ModalComponent: React.ComponentType<BaseModalProps<any> & E>;
  rowKey?: string;
  modalProps?: E;
  expandable?: ExpandableConfig<T>;
  hideCreateButton?: boolean;
  useSettingsAction?: boolean;
}
