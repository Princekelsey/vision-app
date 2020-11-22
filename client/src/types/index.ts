export interface UserI {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDataI {
  email: string;
  password: string;
}

export interface SignUpDataI {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface FormStateI {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
