import { useEffect } from "react";


declare const HSStepForm: any;
declare const HSBsValidation: any;

interface Props {
    formFolerRef: React.RefObject<HTMLFormElement | null>,
    messagaElementRef: React.RefObject<HTMLDivElement | null>
    preventNextStep?: () => Promise<boolean>, 
    onFinish?: () => void
}
export const useFormStep = ({ formFolerRef, messagaElementRef, preventNextStep, onFinish }: Props) => {
    useEffect(() => {

        if (!formFolerRef?.current || !messagaElementRef?.current) return

        new HSStepForm(formFolerRef?.current, {
            validator: HSBsValidation.init('.js-validate'),
            preventNextStep() {
                if (preventNextStep) {
                    return preventNextStep();
                }

                return Promise.resolve(true);
            },
            finish() {
                onFinish?.();
                // const $successMessageTempalte = $el.querySelector('#createFolderSuccessMessage').cloneNode(true)
               /*  const $successMessageTempalte = messagaElementRef?.current
                if (!$successMessageTempalte) return

                $successMessageTempalte.style.display = 'block'

                $el.style.display = 'none'
                $el.parentElement.appendChild($successMessageTempalte) */
            }
        })
    }, [formFolerRef, messagaElementRef])
}