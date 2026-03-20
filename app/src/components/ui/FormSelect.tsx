import { Form, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  options: Option[];
  showSearch?: boolean;
}

export default function FormSelect({
  name,
  label,
  placeholder,
  required = false,
  tooltip,
  options,
  showSearch = false,
}: FormSelectProps) {
  return (
    <Form.Item
      label={
        <span className="text-sm font-medium">
          {label}{" "}
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="text-gray-400 ml-1" />
            </Tooltip>
          )}
        </span>
      }
      name={name}
      rules={
        required ? [{ required: true, message: `Please select ${label.toLowerCase()}` }] : undefined
      }
    >
      <Select
        showSearch={showSearch}
        placeholder={placeholder}
        options={options}
        optionFilterProp="label"
      />
    </Form.Item>
  );
}
