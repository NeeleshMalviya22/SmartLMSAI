import { createCrudService } from "../baseCrudService";

const moduleService = createCrudService("modules");

export const getModulesApi = moduleService.getList;
export const getAllModuleApi = moduleService.getAll;
export const createModuleApi = moduleService.create;
export const updateModuleApi = moduleService.update;
export const deleteModuleApi = moduleService.delete;