

export const validateExpirationDate = (expirationDate: string) => {
  return  new Date(expirationDate) > new Date(); 
}