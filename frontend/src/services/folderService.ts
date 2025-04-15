import {
  createFolderAsync,
  updateFolder as updateFolderApi,
} from '@/api/folderApi'
import { CreateFolder, UpdateFolder } from '@/types'
import { formatISO, parse } from 'date-fns'

export const createFolder = async (
  createfolder: CreateFolder
): Promise<number> => {
  createfolder.folderPermissions = createfolder.folderPermissions.map(
    (permission) => ({
      ...permission,
      expirationDate: permission.expirationDate
        ? formatISO(parse(permission.expirationDate, 'dd/MM/yyyy', new Date()))
        : null,
    })
  )

  return await createFolderAsync(createfolder)
}

export const updateFolder = async (folder: UpdateFolder): Promise<void> => {
  folder.folderPermissions = folder?.folderPermissions?.map((permission) => ({
    ...permission,
    expirationDate: permission.expirationDate
      ? formatISO(parse(permission.expirationDate, 'dd/MM/yyyy', new Date()))
      : null,
  }))
  await updateFolderApi(folder)
}
