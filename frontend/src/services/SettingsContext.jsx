import { createContext } from "react";

// we need this file to make hot reload work, all files should
// only export react components.
const SettingsContext = createContext();
export default SettingsContext;