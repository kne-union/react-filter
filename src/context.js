import { createContext, useContext } from "react";

const context = createContext({});

export const { Consumer, Provider } = context;

export const useConsumer = () => useContext(context);

export default context;