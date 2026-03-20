
import { createCrudService } from "../baseCrudService";
import type { Question } from "../../types/types";

const questionService = createCrudService<Question>("questions");

export const getQuestionsApi = questionService.getList;
export const createQuestionApi = questionService.create;
export const updateQuestionApi = questionService.update;
export const deleteQuestionApi = questionService.delete;