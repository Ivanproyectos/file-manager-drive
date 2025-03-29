import { useState, useEffect } from "react";
import { IFile } from "@/types";
import { FileItem } from "@/components";
import { getFilesAsync } from "@/api/folderApi";

interface fileItemProps {
  folderId: number;
}
export const FileList = ({ folderId }: fileItemProps) => {
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await getFilesAsync(folderId);
        setFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <ul className="list-group">
      {files.map((file) => (
        <FileItem key={file.id} file={file} />
      ))}
    </ul>
  );
};
