import pdfIcon from '@/assets/svg/brands/pdf-icon.svg';
import imageIcon from '@/assets/svg/components/placeholder-img-format.svg';
import docIcon from '@/assets/svg/brands/word-icon.svg';
import txtIcon from '@/assets/svg/brands/google-docs-icon.svg';
import xlsxIcon from '@/assets/svg/brands/google-sheets-icon.svg';


const fileIconMapping = {
    pdf: pdfIcon,
    jpg: imageIcon,
    jpeg: imageIcon,
    png: imageIcon,
    gif: imageIcon,
    doc: docIcon,
    docx: docIcon,
    txt: txtIcon,
    zip: docIcon,
    rar: docIcon,
    xlsx: xlsxIcon
  };
  

  export const getFileIcon = (extension: string) => {

    return fileIconMapping[extension.toLowerCase() as keyof typeof fileIconMapping] || docIcon;
  };
  