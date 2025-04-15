import {
  getUserFiles,
  getUserFolders,
  getUserSubfolders,
} from '@/api/userFolder'
import { ISubFolder, IUserFile } from '@/types'
import { useEffect, useState } from 'react'

interface Props {
  folderId: number
}
export const useUserFolder = ({ folderId }: Props) => {
  const [folders, setFolders] = useState<ISubFolder[]>([])
  const [subFolders, setSubFolders] = useState<ISubFolder[]>([])
  const [files, setFiles] = useState<IUserFile[]>([])
  const [loadingFolders, setloadingFolders] = useState(true)
  const [loadingFiles, setloadingFiles] = useState(true)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setloadingFiles(true)
        const files = await getUserFiles(folderId)

        setFiles(files)
        setloadingFiles(false)
      } catch (error) {
        console.error('Error fetching files:', error)
        setloadingFiles(false)
      }
    }

    fetchFiles()
  }, [folderId])

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folders = await getUserFolders()
        setFolders(folders)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setloadingFolders(false)
        // setLoading(false);
      }
    }
    fetchFolders()
  }, [])

  useEffect(() => {
    const fetchSubFolders = async () => {
      try {
        setloadingFolders(true)
        if (folderId !== 0) {
          const folders = await getUserSubfolders(folderId)
          setSubFolders(folders)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setloadingFolders(false)
      }
    }
    fetchSubFolders()
  }, [folderId])

  return { files, folders, subFolders, loadingFolders, loadingFiles }
}
