import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import Cookies from 'js-cookie';


class SignalRService {

    public connection: HubConnection | null = null;
    private isConnected: boolean = false;
    // Conectar al Hub de SignalR
    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log('Ya estás conectado.');
            return;
        }

        const token = Cookies.get(import.meta.env.VITE_TOKEN_NAME);
        this.connection = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_BASE_URL}/fileUploadHub`, {
                accessTokenFactory: () => token || "",
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .configureLogging(LogLevel.Warning)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    if (retryContext.elapsedMilliseconds < 60000) {
                        return 5000; // Reintentar cada 5 segundos
                    }
                    return null; // Detener reconexión después de 1 minuto
                },
            }).build();

        // Configurar el evento de notificación
        /*     this.connection.on('FileUploaded', (mensaje: string) => {
                alert(mensaje); // Puedes llamar a una función que maneje este mensaje en el componente
            }); */

        // Iniciar la conexión
        try {
            await this.connection.start();
            this.isConnected = true;
            console.log('Conexión SignalR establecida');
        } catch (err) {
            console.error('Error de conexión: ', err);
        }
    }
    // Enviar una notificación al servidor
    public async notificarProgreso(mensaje: string): Promise<void> {
        if (this.isConnected && this.connection) {
            try {
                await this.connection.invoke('NotificarProgreso', mensaje);
            } catch (err) {
                console.error('Error al invocar NotificarProgreso:', err);
            }
        } else {
            console.error('No estás conectado al Hub de SignalR');
        }
    }
    // Detener la conexión cuando ya no sea necesaria
    public async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            this.isConnected = false;
            console.log('Conexión SignalR cerrada');
        }
    }
}

const signalRService = new SignalRService();
export default signalRService;