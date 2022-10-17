export type TBook = {
    bookAuthor: string;
    bookTitle: string;
    bookDesc: string;
};

export type TUser = {
    userName: string;
    email: string;
    password: string;
    role: string;
    _doc: any;
};

export type TMyContext =  {
    token?: String;
};

export type TGetUser = {
    id: string;
};

export type TEditUser = {
    id: string;
    userName: string;
};