import { Form, Switch, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface FormSwitchProps {
  name: string;
  label: string;
  helperText?: string;
  tooltip?: string;
  defaultValue?: boolean;
}

export default function FormSwitch({
  name,
  label,
  helperText,
  tooltip,
  defaultValue = true,
}: FormSwitchProps) {
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
      valuePropName="checked"
      initialValue={defaultValue}
    >
      <div className="flex items-center gap-4 mt-2">
        <Switch />
        {helperText && <span className="text-gray-500 text-sm">{helperText}</span>}
      </div>
    </Form.Item>
  );
}
