import { IFile } from "@/types";
import { FileItem, FileItemSkeleton } from "@/components";


interface fileItemProps {
  files: IFile[]
  loading: boolean
  onRefresh: React.Dispatch<React.SetStateAction<boolean>>
}
export const FileList = ({ files, loading, onRefresh }: fileItemProps) => {
  return (
    <ul className="list-group">
      {loading ? (
        <FileItemSkeleton />
      ) : (
        files.map((file) => <FileItem key={file.id} file={file} onRefresh={onRefresh} />)
      )}
    </ul>
  );
};
