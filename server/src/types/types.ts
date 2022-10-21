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

export type TGetBook = {
    _id: string;
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

export type TFilterBooks = {
    bookAuthor: string;
    bookTitle: string;
    bookDesc: string;
    genre: string;
    limitPerPage: number;
    page: number;
    sort: { $meta: "textScore"; };
};

export enum TGenres {
    Fiction = 'fiction',
    Thriller = 'thriller',
    Drama = 'drama',
}

export enum TSort {
    AuthorAlphabetically = 1,
}

declare module "express" {
    export interface Request {
        session: TSession;
    }
}