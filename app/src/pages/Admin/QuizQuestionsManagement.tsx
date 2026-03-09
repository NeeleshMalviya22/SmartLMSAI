import { Tag } from "antd";
import EntityManagement from "../../components/common/EntityManagement";
import CreateQuestionModal from "../../components/modals/CreateQuestionModal";
import {
  createQuestionApi,
  deleteQuestionApi,
  getQuestionsApi,
  updateQuestionApi
} from "../../services/question/questionService";

import { useParams } from "react-router-dom";

const columns = [
  {
    title: "Question",
    dataIndex: "questionText",
  },
  {
    title: "Type",
    dataIndex: "questionType",
  },
];

export default function QuizQuestionsManagement() {
  const { quizId } = useParams();

  const renderOptions = (record: any) => {
    return (
      <div style={{ paddingLeft: 20 }}>
        {record.options?.map((opt: any) => (
          <div
            key={opt.optionId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6
            }}
          >
            <Tag color={opt.isCorrect ? "green" : "default"}>
              {opt.isCorrect ? "Correct" : "Option"}
            </Tag>

            <span>{opt.optionText}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <EntityManagement
      title="Quiz Questions"
      columns={columns}
      fetchData={(params: any) =>
        getQuestionsApi({ ...params, quizId })
      }
      createApi={(data: any) =>
        createQuestionApi({ ...data, quizId })
      }
      updateApi={updateQuestionApi}
      deleteApi={deleteQuestionApi}
      ModalComponent={CreateQuestionModal}
      rowKey="questionId"
      modalProps={{ quizId }}
      expandable={{
        expandedRowRender: renderOptions
      }}
    />
  );
}