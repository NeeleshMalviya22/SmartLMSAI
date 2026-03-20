import { message } from "antd";

export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  readonly details?: Record<string, string[]>;

  constructor(
    code: string,
    statusCode: number,
    messageText: string,
    details?: Record<string, string[]>
  ) {
    super(messageText);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function handleError(error: unknown, defaultMessage = "An error occurred"): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    const code = (error as any).code || "UNKNOWN_ERROR";
    const statusCode = (error as any).statusCode || 500;
    const details = (error as any).details;
    return new AppError(code, statusCode, error.message, details);
  }

  if (typeof error === "string") {
    return new AppError("UNKNOWN_ERROR", 500, error);
  }

  return new AppError("UNKNOWN_ERROR", 500, defaultMessage);
}

export function showErrorMessage(error: unknown, defaultMessage = "An error occurred") {
  const appError = handleError(error, defaultMessage);
  message.error(appError.message);
  return appError;
}

export function logError(error: unknown, context?: string) {
  const appError = handleError(error);
  const logMessage = context ? `[${context}] ${appError.message}` : appError.message;
  
  if (import.meta.env.DEV) {
    console.error(logMessage, {
      code: appError.code,
      statusCode: appError.statusCode,
      details: appError.details,
      stack: appError.stack,
    });
  }
  
  return appError;
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.statusCode === 0 || error.code === "NETWORK_ERROR";
  }
  return (error as any)?.code === "ECONNREFUSED" || (error as any)?.response?.status === 0;
}

export function isAuthError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.statusCode === 401 || error.statusCode === 403;
  }
  return (error as any)?.response?.status === 401 || (error as any)?.response?.status === 403;
}

export function isValidationError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.statusCode === 422 || error.code === "VALIDATION_ERROR";
  }
  return (error as any)?.response?.status === 422;
}
