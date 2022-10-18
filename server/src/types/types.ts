import { Types } from 'mongoose';

export type TBook = {
    bookAuthor: string;
    bookTitle: string;
    bookDesc: string;
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

export type TContext<T> = {
    session: {
        destroy: Function;
        cookie: {
            path: string;
            _expires: Date;
            originalMaxAge: number;
            httpOnly: boolean;
        };
        userName: string;
    };
    user: T;
};

export type TPagination = {
    limitPerPage: number;
    page: number;
}