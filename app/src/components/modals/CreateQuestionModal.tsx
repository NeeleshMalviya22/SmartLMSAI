import { Form, Input, Select, Space, Button, Checkbox } from "antd";
import { useState } from "react";
import FormModal from "../common/FormModal";
import type { CreateQuestionModalProps } from "../../types/modals";

const { Option } = Select;

type QuestionType = "MCQ" | "TRUE_FALSE";

interface CreateQuestionValues {
  quizId: number;
  questionText: string;
  questionType: QuestionType;
  orderIndex: number;
  options?: Array<{ optionText: string; isCorrect: boolean; points?: number }>;
  correctAnswer?: "true" | "false";
}

interface CreateQuestionPayload extends CreateQuestionValues {
  questionTypeId: number;
}

export default function CreateQuestionModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEdit,
  quizId,
}: CreateQuestionModalProps) {

  const [type, setType] = useState<QuestionType>("MCQ");

  const handleSubmit = (values: CreateQuestionValues) => {
    const payload: CreateQuestionPayload = {
      quizId,
      questionText: values.questionText,
      orderIndex: values.orderIndex ?? 1,
      questionType: values.questionType,
      questionTypeId: values.questionType === "MCQ" ? 1 : 2,
      options: [],
    };

    if (values.questionType === "MCQ") {
      payload.options =
        values.options?.map((o) => ({
          optionText: o.optionText,
          isCorrect: o.isCorrect || false,
          points: 1,
        })) || [];
    }

    if (values.questionType === "TRUE_FALSE") {
      payload.options = [
        {
          optionText: "True",
          isCorrect: values.correctAnswer === "true",
          points: 1,
        },
        {
          optionText: "False",
          isCorrect: values.correctAnswer === "false",
          points: 1,
        },
      ];
    }

    onSubmit(payload);
  };

  return (
    <FormModal
      title={isEdit ? "Edit Question" : "Create Question"}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >

      <Form.Item
        label="Question"
        name="questionText"
        rules={[{ required: true, message: "Please enter question" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Question Type"
        name="questionType"
        initialValue="MCQ"
      >
        <Select onChange={(val) => setType(val)}>
          <Option value="MCQ">Multiple Choice</Option>
          <Option value="TRUE_FALSE">True / False</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Order"
        name="orderIndex"
        initialValue={1}
      >
        <Input type="number" />
      </Form.Item>

      {type === "MCQ" && (
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                  
                  <Form.Item
                    {...field}
                    name={[field.name, "optionText"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Option text" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "isCorrect"]}
                    valuePropName="checked"
                  >
                    <Checkbox>Correct</Checkbox>
                  </Form.Item>

                  <Button danger onClick={() => remove(field.name)}>
                    Delete
                  </Button>

                </Space>
              ))}

              <Button type="dashed" onClick={() => add()}>
                + Add Option
              </Button>
            </>
          )}
        </Form.List>
      )}

      {type === "TRUE_FALSE" && (
        <Form.Item
          label="Correct Answer"
          name="correctAnswer"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="true">True</Option>
            <Option value="false">False</Option>
          </Select>
        </Form.Item>
      )}

    </FormModal>
  );
}