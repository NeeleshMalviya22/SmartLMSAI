
import { createCrudService } from "../baseCrudService";

const questionService = createCrudService("questions");

export const getQuestionsApi = questionService.getList;
export const createQuestionApi = questionService.create;
export const updateQuestionApi = questionService.update;
export const deleteQuestionApi = questionService.delete;