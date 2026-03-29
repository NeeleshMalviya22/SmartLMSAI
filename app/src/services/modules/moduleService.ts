import { createCrudService } from "../baseCrudService";
import type { Module } from "../../types/types";
import axios from "axios";

const moduleService = createCrudService<Module>("modules");

export const getModulesApi = moduleService.getList;
export const getAllModuleApi = moduleService.getAll;
export const createModuleApi = moduleService.create;
export const updateModuleApi = moduleService.update;
export const deleteModuleApi = moduleService.delete;

export interface ModuleDto {
  id: string;
  title: string;
  description?: string;
}

export const getModulesByCourseApi = async (courseId: string) => {
  const res = await axios.get(`/api/module/${courseId}`);
  return res.data;
};