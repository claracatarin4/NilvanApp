import { JSX } from "react";
import { LoginScreenProps } from "../../../src/screens/Login/LoginScreen"; 
import { LoginScreen } from "../../../src/screens/Login/LoginScreen";

export default function LoginRoute(props: LoginScreenProps): JSX.Element {
    return <LoginScreen {...props} />;
}