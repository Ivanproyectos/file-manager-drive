import { createFile as createFileApi } from "@/api/files"
import { ICreateFile } from "@/types"
import { parse, formatISO } from 'date-fns';

export const createFileAsync = async (createFile: ICreateFile) => {
  console.log(createFile);

  createFile.filePermissions = createFile.filePermissions.map((permission) => ({
    ...permission,
    expirationDate:permission.expirationDate ? formatISO(parse(permission.expirationDate, 'dd/MM/yyyy', new Date())) : null
  }));

  await createFileApi(createFile);
}

export const validateExpirationDate = (expirationDate: string) => {
  return  new Date(expirationDate) > new Date(); 
}