import { createCrudService } from "../baseCrudService";
import apiClient from "../apiClient";
import type { DocumentItem } from "../../types/types";

const documentService = createCrudService<DocumentItem>("documents");

export const getDocumentsApi = documentService.getList;
export const getAllDocumentsApi = documentService.getAll;
export const deleteDocumentApi = documentService.delete;
export const updateDocumentApi = documentService.update;

/* Upload PDF */
export const uploadDocumentApi = async (formData: FormData) => {
  const res = await apiClient.post("documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};