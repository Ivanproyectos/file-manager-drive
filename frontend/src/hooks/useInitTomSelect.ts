import { useEffect } from "react";

declare const HSCore: any
export const useInitTomSelect = () => {
    useEffect(() => {
        HSCore.components.HSTomSelect.init('.js-select')

        return () => {
            const tomSelects = HSCore.components.HSTomSelect.getItems();
            tomSelects.forEach((tomSelect : any) => tomSelect.destroy());
        }
    }, [])
}