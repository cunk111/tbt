import * as e from 'express'
import { IUser } from './User'

export type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
}

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: IUser;
  }
}

declare module 'express' {
  export interface Request {
    signedCookies: Record<string, string>;
  }
}
