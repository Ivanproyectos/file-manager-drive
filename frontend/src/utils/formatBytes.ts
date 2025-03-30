export const convertBytes = (bytes:number) =>  {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    let i = 0;

    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024;
      i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
  }
  