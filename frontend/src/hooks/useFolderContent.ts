import  { useEffect, useState } from "react";
import { ISubFolder } from "@/types";
import { getSubFoldersAsync } from "@/api/folderApi";
import { IFile } from "@/types";
import { getFilesAsync } from "@/api/folderApi";

interface Props{
    folderId: number
}
export const useFolderContent = ({ folderId }: Props) => {
    const [files, setFiles] = useState<IFile[]>([]);
    const [folders, setFolders] = useState<ISubFolder[]>([]);
    const [loadingFolders, setloadingFolders] = useState(true);
    const [loadingFiles, setloadingFiles] = useState(true);

      useEffect(() => {
        const fetchFolders = async () => {
          try {
            setloadingFolders(true);
            const folders = await getSubFoldersAsync(folderId);
            setFolders(folders);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setloadingFolders(false);
          }
        };
        fetchFolders();
      }, [folderId]);

        useEffect(() => {
          const fetchFiles = async () => {
            try {
              setloadingFiles(true);
              const files = await getFilesAsync(folderId);
              setFiles(files);
           
            } catch (error) {
              console.error("Error fetching files:", error);

            }finally {
                setloadingFiles(false);
            }
          };
      
          fetchFiles();
        }, [folderId]);

      return { folders,files, loadingFiles, loadingFolders };
    }