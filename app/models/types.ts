import * as e from 'express'
import { Query } from 'express-serve-static-core'
import { IUser } from './User'

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: IUser;
  }
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
}

declare module 'express' {

  export interface Request {
    signedCookies: Record<string, string>;
  }
}
