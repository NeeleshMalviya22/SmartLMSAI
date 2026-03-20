export interface BaseModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  initialValues?: Partial<T>;
  isEdit?: boolean;
}
