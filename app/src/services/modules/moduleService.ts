import { createCrudService } from "../baseCrudService";
import type { Module } from "../../types/types";

const moduleService = createCrudService<Module>("modules");

export const getModulesApi = moduleService.getList;
export const getAllModuleApi = moduleService.getAll;
export const createModuleApi = moduleService.create;
export const updateModuleApi = moduleService.update;
export const deleteModuleApi = moduleService.delete;