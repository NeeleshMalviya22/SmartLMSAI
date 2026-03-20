import { createCrudService } from "../baseCrudService";
import type { Learner } from "../../types/types";

const learnerService = createCrudService<Learner>("enrollments");

export const getLearnersApi = learnerService.getList;
export const getAllLearnersApi = learnerService.getAll;
export const createLearnerApi = learnerService.create;
export const updateLearnerApi = learnerService.update;
export const deleteLearnerApi = learnerService.delete;