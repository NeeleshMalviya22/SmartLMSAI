import EntityManagement from "../../components/common/EntityManagement";
import CreateDocumentModal from "../../components/modals/CreateDocumentModal";
import { documentColumns } from "../../config/tableColumns";
import {
  deleteDocumentApi,
  getDocumentsApi,
  uploadDocumentApi,
} from "../../services/document/documentService";
import { getAllModuleApi } from "../../services/modules/moduleService";
import { useEffect, useState } from "react";
import type { Module, DocumentItem } from "../../types/types";

interface UploadDocumentValues {
  moduleId: number;
  file: File;
}

interface ModalExtraProps {
  modules: Module[];
}

export default function DocumentManagement() {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    void loadModules();
  }, []);

  async function loadModules() {
    const res = await getAllModuleApi();
    const moduleItems = Array.isArray(res)
      ? res
      : (res as { data?: Module[] })?.data ?? [];
    setModules(moduleItems as Module[]);
  }

  const uploadHandler = async (values: UploadDocumentValues) => {
    const formData = new FormData();
    formData.append("moduleId", String(values.moduleId));
    formData.append("file", values.file);
    await uploadDocumentApi(formData);
  };

  return (
    <EntityManagement<DocumentItem, ModalExtraProps>
      title="Documents"
      columns={documentColumns}
      fetchData={getDocumentsApi}
      createApi={uploadHandler}
      deleteApi={deleteDocumentApi}
      ModalComponent={CreateDocumentModal}
      rowKey="id"
      modalProps={{ modules }}
    />
  );
}