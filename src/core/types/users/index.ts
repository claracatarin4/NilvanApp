export interface Users {
  id: number | null;
  imagem: null;
  name: string;
  cargo: string;
  email: string; 
  senha: string;  
  role: string;
  status: number; 
}

export interface UserCardProps {
    user: Users;
    onPress: () => void;
}
