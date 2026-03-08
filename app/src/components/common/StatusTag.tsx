import { Tag } from "antd";

export default function StatusTag({ active }: { active: boolean }) {
  return active ? (
    <Tag color="green">Active</Tag>
  ) : (
    <Tag color="red">Inactive</Tag>
  );
}