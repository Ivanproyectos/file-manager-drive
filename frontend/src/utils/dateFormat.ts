export const convertDateToLocaleString = (isoDate: string): string => {
    const date = new Date(isoDate);
    
    const friendlyDateWithTime = date.toLocaleString('es-ES', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
    // hour: 'numeric', 
    //  minute: 'numeric',
    //  second: 'numeric',
      hour12: false // Usar formato de 24 horas
    });
    return friendlyDateWithTime;
}