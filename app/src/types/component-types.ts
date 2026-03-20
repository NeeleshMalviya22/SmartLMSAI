import type { ComponentType, ReactNode } from "react";

/**
 * Generic component types for better type safety
 */

export type LazyComponentType<P = Record<string, unknown>> = ComponentType<P>;

export interface ModalComponentProps<T = unknown> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  initialValues?: Partial<T>;
  isEdit?: boolean;
  [key: string]: unknown; // Allow additional props (modalProps)
}

export interface DataTableComponentProps<T = unknown> {
  dataSource: T[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

export interface FormComponentProps<T = unknown> {
  initialValues?: Partial<T>;
  onSubmit: (values: T) => void;
  loading?: boolean;
}

export type RenderFunction<T = unknown> = (item: T) => ReactNode;
export type ClickHandler<T = unknown> = (item: T) => void | Promise<void>;
