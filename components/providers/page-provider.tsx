"use client";
import React from "react";
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from "../mobile-menu";

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const formatPathname = (path: string) => {
    if (path === '/') return 'Home';
    return path
      .replace(/^\//, '')
      .replace(/\/$/, '')
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="w-full max-w-5xl h-auto flex flex-col items-center border-l border-r border-gray-300 pb-10">
      <div className="w-full p-3 pt-3 border-b border-gray-400 flex flex-row gap-2 items-center justify-between md:hidden">
        <p className="pl-1 text-2xl font-semibold">{formatPathname(pathname || '/')}</p>
        <MobileMenu />
      </div>
      {children}
    </div>
  );
};

export default PageProvider;