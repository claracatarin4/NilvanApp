import { JSX } from "react"; 
import { RegisterScreen } from "../../../src/screens/Registro/RegisterScreen";

export default function RegisterRoute(): JSX.Element | null {
    
    return RegisterScreen ? <RegisterScreen /> : null;
}
