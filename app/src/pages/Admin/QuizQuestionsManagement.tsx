import { Tag } from "antd";
import EntityManagement from "../../components/common/EntityManagement";
import CreateQuestionModal from "../../components/modals/CreateQuestionModal";
import { questionColumns } from "../../config/tableColumns";
import {
  createQuestionApi,
  deleteQuestionApi,
  getQuestionsApi,
  updateQuestionApi
} from "../../services/question/questionService";
import { useParams } from "react-router-dom";

export default function QuizQuestionsManagement() {
  const { quizId } = useParams<{ quizId: string }>();
  const quizIdNumber: number = Number(quizId);
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

  if (!quizIdNumber) {
    return <div>Quiz ID is missing.</div>;
  }

  return (
    <EntityManagement
      title="Quiz Questions"
      columns={questionColumns}
      fetchData={(params: any) =>
        getQuestionsApi({ ...params, quizId: quizIdNumber })
      }
      createApi={(data: any) =>
        createQuestionApi({ ...data, quizId: quizIdNumber })
      }
      updateApi={updateQuestionApi}
      deleteApi={deleteQuestionApi}
      ModalComponent={CreateQuestionModal}
      rowKey="questionId"
      modalProps={{ quizId: quizIdNumber }}
      expandable={{
        expandedRowRender: renderOptions
      }}
    />
  );
}