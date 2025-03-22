import { createContext } from "react";
import { initialSettings } from "./initialSettings";

// we need this file to make hot reload work, all files should
// only export react components.
const SettingsContext = createContext(initialSettings);
export default SettingsContext;