import { createCrudService } from "../baseCrudService";

const courseService = createCrudService("courses");

export const getCoursesApi = courseService.getList;
export const getAllCoursesApi = courseService.getAll;
export const createCourseApi = courseService.create;
export const updateCourseApi = courseService.update;
export const deleteCourseApi = courseService.delete;