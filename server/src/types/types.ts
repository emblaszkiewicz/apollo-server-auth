import { Types } from 'mongoose';

export type TBook = {
    bookAuthor: string;
    bookTitle: string;
    bookDesc: string;
    genre: string;
};

export type TUser = {
    _id: Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    role: string;
};

export type TGetUser = {
    id: string;
};

export type TEditUser = {
    id: string;
    userName: string;
};

export type TSession = {
    destroy: Function;
    cookie: {
        path: string;
        _expires: Date;
        originalMaxAge: number;
        httpOnly: boolean;
    };
    userName: string;
    isLogin: boolean;
    isAdmin: boolean;
}

export type TContext<T> = {
    session: TSession;
    user: T;
};

export type TPagination = {
    limitPerPage: number;
    page: number;
};

export enum TGenres {
    Fiction = 'fiction',
    Thriller = 'thriller',
    Drama = 'drama',
}

declare module "express" {
    export interface Request {
        session: TSession;
    }
}