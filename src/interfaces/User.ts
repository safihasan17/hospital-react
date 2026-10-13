
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role_id: number;
  active?: boolean | number;
  password?: string;
  password_confirmation?: string;
  role?: {
    id:number,
    name:string
  };
};

export const defaultUser: User = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  role_id: 0,
  active: true,
  password: "",
  password_confirmation: "",
};

export const errorUser: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    role_id: 0,
    password: '',
    password_confirmation: ''
}