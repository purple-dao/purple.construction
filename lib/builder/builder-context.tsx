'use client';

import React, { createContext } from 'react';

import type { DaoConfig } from './types';

export const DaoContext = createContext<DaoConfig>({
  collection: '',
  chain: 'BASE',
});

export const BuilderDAO = ({ collection, chain, children }: React.PropsWithChildren<DaoConfig>) => {
  return React.createElement(DaoContext.Provider, {
    children: React.createElement('div', {
      children,
      context: DaoContext,
    }),
    value: { collection, chain },
  });
};
