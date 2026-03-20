import { Form, Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  type?: string;
}

export default function FormInput({
  name,
  label,
  placeholder,
  required = false,
  tooltip,
  type = "text",
}: FormInputProps) {
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
        required ? [{ required: true, message: `Please enter ${label.toLowerCase()}` }] : undefined
      }
    >
      <Input
        type={type}
        size="large"
        placeholder={placeholder}
        className="h-12 rounded-md border-gray-300"
      />
    </Form.Item>
  );
}
