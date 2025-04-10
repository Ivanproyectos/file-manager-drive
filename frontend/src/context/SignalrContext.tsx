import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { HubConnection } from '@microsoft/signalr';
import signalRService from '@/services/signalrService';
import { signalrReducer } from '@/reducers/signalrReducer';


interface SignalrContextValue {
  signalr: HubConnection | null;
  loading: boolean;
}

const SignalrContext = createContext<SignalrContextValue>({ signalr: null, loading: true });

export const SignalrProvider = ({ children }: { children: React.ReactNode }) => {

  const [signalr, setSignalr] = useState<HubConnection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupConnection = async () => {
      try {
        setLoading(true);
        if(signalr) return

        await signalRService.connect();
        setSignalr(signalRService.connection);
        setLoading(false);
      } catch (error) {
        console.error("Error al conectar con SignalR:", error);
      }
    };

    setupConnection();

 /*    return () => {
      debugger;
      setSignalr(null);
      signalRService.disconnect();
    }; */
  }, []);

  return (
    <SignalrContext.Provider value={{ signalr, loading}}>
      {children}
    </SignalrContext.Provider>
  );
};

export const useSignalr = (): SignalrContextValue => {
  const context = useContext(SignalrContext);
  if (!context) {
    throw new Error('useSignalr must be used within a SignalrProvider');
  }
  return context;
};