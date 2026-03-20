import { Tag } from "antd";
import type { StatusTagProps } from "../../types/component-props";

export default function StatusTag({ active }: StatusTagProps) {
  return active ? (
    <Tag color="green">Active</Tag>
  ) : (
    <Tag color="red">Inactive</Tag>
  );
}