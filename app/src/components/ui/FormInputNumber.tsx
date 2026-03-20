import { Form, InputNumber, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface FormInputNumberProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  min?: number;
  max?: number;
}

export default function FormInputNumberField({
  name,
  label,
  placeholder,
  required = false,
  tooltip,
  min,
  max,
}: FormInputNumberProps) {
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
      <InputNumber
        min={min}
        max={max}
        placeholder={placeholder}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
}
