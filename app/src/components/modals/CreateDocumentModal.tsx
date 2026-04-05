import { Form, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormModal from "../common/FormModal";
import type { Module } from "../../types/types";
import type { CreateDocumentModalProps } from "../../types/modals";

export default function CreateDocumentModal({
  open,
  onClose,
  onSubmit,
  modules,
}: CreateDocumentModalProps) {
  return (
    <FormModal
      title="Upload Document"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Form.Item
        name="moduleId"
        label="Module"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select Module"
          options={modules?.map((m: Module) => ({
            label: m.title,
            value: m.moduleId,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="file"
        label="PDF File"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        }}
        rules={[{ required: true }]}
      >
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          accept=".pdf"
        >
          <div className="border border-dashed rounded-lg p-6 text-center cursor-pointer">
            <UploadOutlined />
            <p>Upload PDF</p>
          </div>
        </Upload>
      </Form.Item>
    </FormModal>
  );
}