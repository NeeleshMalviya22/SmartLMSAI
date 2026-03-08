import { createCrudService } from "../baseCrudService";

const quizService = createCrudService("quizzes");

export const getQuizzesApi = quizService.getList;
export const getAllQuizzesApi = quizService.getAll;
export const createQuizApi = quizService.create;
export const updateQuizApi = quizService.update;
export const deleteQuizApi = quizService.delete;