import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { AppSearchProps } from "../../types/component-props";

export default function AppSearch({ placeholder, onSearch }: AppSearchProps) {
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