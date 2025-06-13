import { createContext, useContext } from 'react';

export const BaseUrlContext = createContext();

export const useBaseUrl = () => useContext(BaseUrlContext);
