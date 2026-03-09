import { createCrudService } from "../baseCrudService";
import apiClient from "../apiClient";

const learnerService = createCrudService("learners");

export const getLearnersApi = learnerService.getList;
export const getAllLearnersApi = learnerService.getAll;

export const getLearnerCoursesApi = async (learnerId: string) => {
  const res = await apiClient.get(`course-enrollments/learner/${learnerId}`);
  return res.data;
};

export const setLearnerCoursesApi = async (data: any) => {
  const res = await apiClient.post(`course-enrollments/set`, data);
  return res.data;
};