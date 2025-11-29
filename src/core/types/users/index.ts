import { RoleName } from "../../../shared/enums/roleName";

export interface Users {
  id: number | null;
  imagem: null;
  name: string;
  cargo: string;
  email: string; 
  senha: string;  
  role: RoleName;
  status: number; 
}

export interface UserResponse{
  imagem: string;
  id:number,
  nome:string,
  cargo:string,
  email:string,
  role: RoleName;
  senha:string,
  status:number;
}

export interface LoginDtoRequest{
  email: string,
  senha: string;
}

export interface LoginDTOResponse{
  token: string;
}

export interface UserCardProps {
    user: Users;
    onPress: () => void;
}
