export interface AppSearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export interface DeleteButtonProps {
  onConfirm: () => void;
}

export interface StatusTagProps {
  active: boolean;
}
