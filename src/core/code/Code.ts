export type CodeDescription = {
  statusCode: number;
  message: string;
};

export class Code {
  public static SUCCESS: CodeDescription = {
    statusCode: 200,
    message: 'Success',
  };

  public static BAD_REQUEST_ERROR: CodeDescription = {
    statusCode: 400,
    message: 'Bad request',
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    statusCode: 400,
    message: 'Entity validation error',
  };

  public static UNAUTHORIZED_ERROR: CodeDescription = {
    statusCode: 401,
    message: 'Unauthorized error',
  };

  public static FORBIDDEN_ERROR: CodeDescription = {
    statusCode: 403,
    message: 'Access denied',
  };

  public static ENTITY_NOT_FOUND_ERROR: CodeDescription = {
    statusCode: 404,
    message: 'Entity not found',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: CodeDescription = {
    statusCode: 409,
    message: 'Entity already exists',
  };

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    statusCode: 500,
    message: 'Internal server error',
  };
}
