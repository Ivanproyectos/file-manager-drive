import { useState } from "react";

interface Breadcrumbs {
    id: number;
    name: string;
    class?: string;
}
export const useFolderBreadcrumbs = (defualtFolderId: number) => {
    const [folderId, setFolderId] = useState<number>(Number(defualtFolderId));
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);
    const handleNavigateToSubfolder = (
        newFolderId: number,
        newFolderName: string
    ) => {
        const newSubFolder = { id: newFolderId, name: newFolderName };
        setFolderId(newFolderId);
        setBreadcrumbs((prevState) => [...prevState, newSubFolder]);
    };

    const handleGoBackToFolder = (folderId: number) => {
        setFolderId(folderId);
        setBreadcrumbs((prevState) =>
            prevState.slice(0, prevState.findIndex((x) => x.id === folderId) + 1)
        );
    };

    return { handleNavigateToSubfolder, handleGoBackToFolder,setBreadcrumbs, folderId, breadcrumbs }


}