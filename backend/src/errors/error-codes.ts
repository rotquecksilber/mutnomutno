import {
  EMAIL_TAKEN,
  LOGIN_PASSWORD,
  NUMBER_NOT_FOUND,
  USER_NOTFOUND,
  USERNAME_TAKEN,
} from './error-messages';
import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  NumberNotFound = 100,
  EmailTaken = 101,
  UserNotFound = 102,
  LoginOrPasswordIncorrect = 103,
  UsernameTaken = 104,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.NumberNotFound, NUMBER_NOT_FOUND],
  [ErrorCode.EmailTaken, EMAIL_TAKEN],
  [ErrorCode.UserNotFound, USER_NOTFOUND],
  [ErrorCode.LoginOrPasswordIncorrect, LOGIN_PASSWORD],
  [ErrorCode.UsernameTaken, USERNAME_TAKEN],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.NumberNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.EmailTaken, HttpStatus.CONFLICT],
  [ErrorCode.UsernameTaken, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.CONFLICT],
]);
