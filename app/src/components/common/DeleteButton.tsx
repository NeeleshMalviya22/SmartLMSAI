import { Button, Popconfirm } from "antd";

export default function DeleteButton({ onConfirm }: any) {
  return (
    <Popconfirm title="Delete record?" onConfirm={onConfirm}>
      <Button type="link" danger>
        Delete
      </Button>
    </Popconfirm>
  );
}