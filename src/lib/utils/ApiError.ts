import axios, { AxiosError } from 'axios';
import * as _ from 'lodash';

export class ApiError {
  status?: number;
  title: string;
  message: string;

  constructor(options: { status?: number; title: string; message: string }) {
    this.status = options.status;
    this.title = options.title;
    this.message = options.message;
  }

  static fromError(error: unknown) {
    return new ApiError(
      _.cond<unknown, ApiError>([
        [
          // eslint-disable-next-line import/no-named-as-default-member
          axios.isAxiosError,
          (err: unknown) =>
            (err as AxiosError<ApiError>).response?.data || {
              title: 'Ошибка',
              message: (err as Error).message,
            },
        ],
        [
          (err) => err instanceof Error,
          (err) => ({
            title: 'Ошибка',
            message: (err as Error).message,
          }),
        ],
      ])(error)
    );
  }
}
