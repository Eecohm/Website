import { createContext, useContext } from 'react';

export const BaseUrlContext = createContext();
export const BaseMediaUrlContext = createContext();

export const useBaseUrl = () => useContext(BaseUrlContext);
export const useBaseMediaUrl = () => useContext(BaseMediaUrlContext);
