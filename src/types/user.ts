export type UserAddress = {
  city: string;
  state: string;
  country: string;
};

export type UserCompany = {
  department: string;
  name: string;
  title: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  role: string;
  university: string;
  address: UserAddress;
  company: UserCompany;
};
