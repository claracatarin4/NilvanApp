import { HomeScreen, ProductListScreen } from "../screens";
import { UsersListScreen } from "../screens/Usuarios/UsersListScreen";

export interface TabConfig {
  name: string;
  component: React.ComponentType<any>;
}

export const roleTabs: Record<"ROLE_ADMIN" | "ROLE_OPERADOR", TabConfig[]> = {

  ROLE_ADMIN: [
    { name: "Home", component: HomeScreen },
    { name: "Produtos", component: ProductListScreen },
    { name: "Usuarios", component: UsersListScreen },

  ],

  ROLE_OPERADOR: [
    { name: "Home", component: HomeScreen },
    { name: "Produtos", component: ProductListScreen },
  ],

};
