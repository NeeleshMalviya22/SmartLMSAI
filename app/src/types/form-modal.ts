import type { ReactNode } from "react";

export interface FormModalProps<T = unknown> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  initialValues?: Partial<T>;
  width?: number;
  children: ReactNode;
}
