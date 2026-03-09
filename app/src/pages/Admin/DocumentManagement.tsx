import EntityManagement from "../../components/common/EntityManagement";
import CreateDocumentModal from "../../components/modals/CreateDocumentModal";
import { deleteDocumentApi, getDocumentsApi, uploadDocumentApi } from "../../services/document/documentService";


import { getAllModuleApi } from "../../services/modules/moduleService";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "File",
    dataIndex: "fileName"
  },
  {
    title: "Module",
    dataIndex: "moduleName"
  },
  {
    title: "Uploaded",
    dataIndex: "createdOn"
  }
];

export default function DocumentManagement() {

  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    const res = await getAllModuleApi();
    setModules(res.data);
  };

  const uploadHandler = async (values: any) => {

    const formData = new FormData();

    formData.append("moduleId", values.moduleId);

    const file = values.file.file;

    formData.append("file", file);

    await uploadDocumentApi(formData);
  };

  return (
    <EntityManagement
      title="Documents"
      columns={columns}
      fetchData={getDocumentsApi}
      createApi={uploadHandler}
      deleteApi={deleteDocumentApi}
      ModalComponent={CreateDocumentModal}
      rowKey="id"
      modalProps={{ modules }}
    />
  );
}