import { useEffect } from "react";

declare const HSCore: any
export const useInitTomSelect = () => {
    useEffect(() => {
        HSCore.components.HSTomSelect.collection = [];

        HSCore.components.HSTomSelect.init('.js-select')

        return () => {
            const tomSelects = HSCore.components.HSTomSelect.getItems();
            if(tomSelects?.length === 0) return

            tomSelects.forEach((tomSelect : any) => tomSelect?.destroy());
        }
    }, [])
}