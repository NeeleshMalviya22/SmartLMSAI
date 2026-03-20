import { Button, Popconfirm } from "antd";
import type { DeleteButtonProps } from "../../types/component-props";

export default function DeleteButton({ onConfirm }: DeleteButtonProps) {
  return (
    <Popconfirm title="Delete record?" onConfirm={onConfirm}>
      <Button type="link" danger>
        Delete
      </Button>
    </Popconfirm>
  );
}