import { useState, useEffect } from "react";
import { IFile } from "@/types";
import { FileItem, FileItemSkeleton } from "@/components";
import { getFilesAsync } from "@/api/folderApi";

interface fileItemProps {
  folderId: number;
}
export const FileList = ({ folderId }: fileItemProps) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const files = await getFilesAsync(folderId);
        setFiles(files);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <ul className="list-group">
      {loading ? (
        <FileItemSkeleton />
      ) : (
        files.map((file) => <FileItem key={file.id} file={file} />)
      )}
    </ul>
  );
};
