
import { createFolderAsync } from "@/api/folderApi"
import { CreateFolder } from "@/types"
import { parse, formatISO } from 'date-fns';

export const createFolder = async (createfolder: CreateFolder): Promise<number> => {

    createfolder.folderPermissions = createfolder.folderPermissions.map((permission) => ({
      ...permission,
      expirationDate:permission.expirationDate ? formatISO(parse(permission.expirationDate, 'dd/MM/yyyy', new Date())) : null
    }));
  
  return await createFolderAsync(createfolder);
  }
  