import { JSX } from "react";
import { HomeScreen, HomeScreenProps } from "../../../src/screens/Home/HomeScreen";

export default function HomeRoute(props: HomeScreenProps): JSX.Element {
    return <HomeScreen {...props} />;
}