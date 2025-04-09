import React, { createContext, useContext, useState, useEffect, useReducer} from 'react';
import { HubConnection } from '@microsoft/signalr'; 
import signalRService from '@/services/signalrService';
import { signalrReducer } from '@/reducers/signalrReducer';

const SignalrContext = createContext<HubConnection | null>(null);

  const init = async () => {
    await signalRService.connect();
    return signalRService.connection
  }

export const SignalrProvider = ({ children }: { children: React.ReactNode }) => {

    const [signalr, dispach] = useState(signalRService);
    const [loading, setLoading] = useState(true);

    debugger;


  /*   useEffect(() => {
      debugger;
      let isMounted = true; // Para evitar actualizar el estado si el componente se desmontó

      const setupConnection = async () => {
          try {
              await signalRService.connect();
              
              if (isMounted) {
                  setSignalr(signalRService.connection);
                  setLoading(false);
              }
          } catch (error) {
              console.error("Error al conectar con SignalR:", error);
              if (isMounted) {
                  setLoading(false);
              }
          }
      };

      setupConnection();
  
      return () => {
        debugger;
        signalRService.disconnect();
      };
    }, []); */
   
    return (
      <SignalrContext.Provider value={signalr}>
        {children}
      </SignalrContext.Provider>
    );
  };
  
  export const useSignalr = (): HubConnection | null => {
    debugger;
    const context = useContext(SignalrContext);
    if (!context) {
      throw new Error('useSignalr must be used within a SignalrProvider');
    }
    return context;
  };