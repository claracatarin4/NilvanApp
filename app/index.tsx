import { Redirect } from "expo-router";
import React, { JSX } from "react"; 

export default function Index(): JSX.Element {
    return <Redirect href="/auth/Login" />;
}