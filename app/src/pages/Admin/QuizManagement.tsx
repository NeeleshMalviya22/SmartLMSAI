import EntityManagement from "../../components/common/EntityManagement";
import CreateQuizModal from "../../components/modals/CreateQuizModal";
import type { Module, Quiz } from "../../types/types";
import { getQuizColumnsWithNavigation } from "../../config/tableColumns";
import {
  getQuizzesApi,
  createQuizApi,
  updateQuizApi,
  deleteQuizApi,
} from "../../services/quiz/quizService";
import { getAllModuleApi } from "../../services/modules/moduleService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizManagement() {
  const [modules, setModules] = useState<Module[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    void loadModules();
  }, []);

  async function loadModules() {
    const res = await getAllModuleApi();
    const moduleItems = Array.isArray(res) ? res : (res as { data?: Module[] })?.data ?? [];
    setModules(moduleItems as Module[]);
  }

  const columns = getQuizColumnsWithNavigation(navigate);

  return (
    <EntityManagement<Quiz, { modules?: Module[] }>
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
