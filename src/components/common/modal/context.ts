import { createContext } from 'react';

import { ModalContextProps } from './types';

export const ModalsContext = createContext<ModalContextProps | null>(null);
