import { useEffect, useState} from "react";
import  signalRService  from '@/services/signalrService';
import { HubConnection } from '@microsoft/signalr';

export const useConnectSignalr = () => {
    const [signalr , setSignalr] = useState<HubConnection| null>();

    useEffect(() => {

        // Conectar al Hub de SignalR
        signalRService.connect().then(() => {
         /*  signalRService.notificarProgreso('Iniciando otro proceso...'); */
          setSignalr(signalRService.connection);
        });
        return () => {
          signalRService.disconnect();
        };
      },[]);

      return {signalr }
}
