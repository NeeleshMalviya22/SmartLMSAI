import EntityManagement from "../../components/common/EntityManagement";
import CreateQuizModal from "../../components/modals/CreateQuizModal";

import {
  getQuizzesApi,
  createQuizApi,
  updateQuizApi,
  deleteQuizApi,
} from "../../services/quiz/quizService";

import { getAllModuleApi } from "../../services/modules/moduleService";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";



export default function QuizManagement() {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    const res = await getAllModuleApi();
    setModules(res.data);
  };
  const columns = [
  {
    title: "Quiz Title",
    dataIndex: "title",
    sorter: true,
  },
  {
    title: "Module",
    dataIndex: "moduleTitle",
  },
  {
    title: "Passing Score",
    dataIndex: "passingScore",
    render: (val: number) => `${val}%`,
  },
   {
    title: "Questions",
    render: (_: any, record: any) => (
      <Button
        type="link"
        onClick={() => navigate(`/admin/questions/${record.quizId}`)}
      >
        Manage Questions
      </Button>
    ),
  },
];

  return (
    <EntityManagement
      title="Quiz Management"
      columns={columns}
      fetchData={getQuizzesApi}
      createApi={createQuizApi}
      updateApi={updateQuizApi}
      deleteApi={deleteQuizApi}
      ModalComponent={CreateQuizModal}
      rowKey="quizId"
      modalProps={{ modules }}
    />
  );
}