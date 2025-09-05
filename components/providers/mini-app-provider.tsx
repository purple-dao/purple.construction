'use client'

import { sdk } from "@farcaster/miniapp-sdk";
import type { MiniAppHost } from "@farcaster/miniapp-sdk";
import React, { createContext, useState, useContext, useMemo } from "react";

interface FrameContextType {
  context: MiniAppHost['context'] | undefined;
  ready: boolean;
}

const FrameContext = createContext<FrameContextType | undefined>(undefined);

export function useMiniAppContext() {
  const context = useContext(FrameContext);
  if (context === undefined) {
    throw new Error('useMiniAppContext must be used within a MiniAppProvider');
  }
  return context;
}

export default function MiniAppProvider({ children }: { children: React.ReactNode }){
    const [context, setContext] = useState<MiniAppHost['context'] | undefined>(undefined);
    const [ready, setReady] = useState<boolean>(false);

    React.useEffect(() => {
        const init = async () => {
          const sdkContext = await sdk.context;
          setContext(sdkContext);
          setTimeout(() => {
            sdk.actions.ready();
            setReady(true);
          }, 500)
        }
        init()
      }, [])

    const value = useMemo(() => ({
      context,
      ready
    }), [context, ready]);

    return(
        <FrameContext.Provider value={value}>
         {children}
        </FrameContext.Provider>
    )
}