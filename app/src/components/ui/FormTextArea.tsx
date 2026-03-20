import { Form, Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  rows?: number;
  maxLength?: number;
}

export default function FormTextArea({
  name,
  label,
  placeholder,
  required = false,
  tooltip,
  rows = 5,
  maxLength = 500,
}: FormTextAreaProps) {
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
      <Input.TextArea
        rows={rows}
        placeholder={placeholder}
        showCount
        maxLength={maxLength}
        className="rounded-md border-gray-300 text-base"
      />
    </Form.Item>
  );
}
