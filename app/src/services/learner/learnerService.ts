import { createCrudService } from "../baseCrudService";

const learnerService = createCrudService("enrollments");

export const getLearnersApi = learnerService.getList;
export const getAllLearnersApi = learnerService.getAll;
export const createLearnerApi = learnerService.create;
export const updateLearnerApi = learnerService.update;
export const deleteLearnerApi = learnerService.delete;