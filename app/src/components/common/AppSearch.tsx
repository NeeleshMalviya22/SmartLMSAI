import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export default function AppSearch({ placeholder, onSearch }: Props) {
  return (
    <Input
      allowClear
      prefix={<SearchOutlined />}
      placeholder={placeholder || "Search..."}
      onChange={(e) => onSearch(e.target.value)}
      style={{ width: 300, height: 45 }}
    />
  );
}