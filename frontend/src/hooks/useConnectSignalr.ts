import { useEffect, useState } from "react";
import signalRService from '@/services/signalrService';
import { HubConnection } from '@microsoft/signalr';

export const useConnectSignalr = () => {
  const [signalr, setSignalr] = useState<HubConnection | null>();

  useEffect(() => {

    const loadSignalr = async () => {
      await signalRService.connect();
      setSignalr(signalRService.connection);
    }
    loadSignalr();
    return () => {
      signalRService.disconnect();
    };
  }, []);

  return signalr
}
