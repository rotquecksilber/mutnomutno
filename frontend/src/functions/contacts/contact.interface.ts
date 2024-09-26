export interface CreateContact{
  name: string;
  email: string;
  tg: string;
  comment: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  tg: string;
  comment: string;
  note?: string;
  __v: number;
}
