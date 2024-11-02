


export type TLoginUser = {
    email: string;
    password: string;
  };
  
  export type TRegisterUser = {
    name: string;
    email: string;
    mobileNumber?: string;
    password: string;
    role: "ADMIN"|"BUYER"|"SELLER";
  };