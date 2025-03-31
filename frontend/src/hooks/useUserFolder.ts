import { useEffect, useState } from "react";
import { IUserFile, ISubFolder } from "@/types";
import { getUserFiles } from "@/api/userFolder";
import { getUserFolders, getUserSubfolders } from "@/api/userFolder";

interface Props {
    folderId: number
}
export const useUserFolder = ({ folderId }: Props) => {
    const [folders, setFolders] = useState<ISubFolder[]>([]);
    const [files, setFiles] = useState<IUserFile[]>([]);
    const [loadingFolders, setloadingFolders] = useState(true);
    const [loadingFiles, setloadingFiles] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                setloadingFiles(true);
                const files = await getUserFiles(folderId);
                setFiles(files);
                setloadingFiles(false);
            } catch (error) {
                console.error("Error fetching files:", error);
                setloadingFiles(false);
            }
        };

        fetchFiles();
    }, [folderId]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                setloadingFolders(true);
                if (folderId === 0) {
                    const folders = await getUserFolders();
                    setFolders(folders);
                } else {
                    const folders = await getUserSubfolders(folderId);
                    setFolders(folders);
                }
                setloadingFolders(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setloadingFolders(false);
                // setLoading(false);
            }
        };
        fetchFolders();
    }, [folderId]);


    return { files, folders, loadingFolders, loadingFiles }
}