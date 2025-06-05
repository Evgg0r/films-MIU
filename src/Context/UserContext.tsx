import {TOKEN} from "../constants/urls.ts";
import {createContext} from "react";

export const UserContext = createContext<string>(TOKEN)
