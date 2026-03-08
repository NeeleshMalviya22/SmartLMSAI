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
    />
  );
}