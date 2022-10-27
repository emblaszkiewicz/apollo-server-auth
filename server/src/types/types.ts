import { Types, SortOrder } from 'mongoose';
import {AuthenticateOptions} from "passport";

export type TBook = {
    bookAuthor: string;
    bookTitle: string;
    bookDesc: string;
    genre: string;
};

export type TUser = {
    googleId: string,
    _id: Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    refreshToken: string,
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
    passport: any;
}

export type TContext<T> = {
    session: TSession;
    user: T;
};

export type TFilterBooks = {
    bookAuthor: string;
    bookTitle: string;
    bookDesc: string;
    genre: string;
    limitPerPage: number;
    page: number;
    sort: string | { [key: string]: SortOrder | { $meta: "textScore"; }; } | [string, SortOrder][];
};

export type TSettings = {
    refreshToken: string;
};

export enum TGenres {
    Fiction = 'Fiction',
    Thriller = 'Thriller',
    Drama = 'Drama',
}

export enum TSort {
    AuthorAlphabetically = 1,
    TitleAlphabetically = 1,
}

declare module "express" {
    export interface Request {
        session: TSession;
    }
}

declare module "passport" {
    export interface AuthenticateOptions {
        accessType?: string,
    }
}