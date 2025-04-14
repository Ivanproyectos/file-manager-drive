import React from "react";

interface Props {
  title: string;
  isSubmitting: boolean;
  onClick?: (event: React.MouseEvent) => void;
  formName?: string;
}

export const ButtonSubmit = ({
  title,
  onClick,
  formName,
  isSubmitting,
}: Props) => {
  return (
    <button
      onClick={onClick}
      {...(formName ? { form: formName } : {})}
      type="submit"
      className={`btn btn-primary d-flex justify-content-center align-items-center`}
      disabled={isSubmitting}
    >
      {/*   <div
        className="spinner-border text-light status-spinner"
        role="status"
        hidden={!isSubmitting}
      >
        <span className="visually-hidden">Loading...</span>
      </div> */}
      <span
        className="spinner-border spinner-border-sm status-spinner"
        hidden={!isSubmitting}
        role="status"
        aria-hidden="true"
      ></span>
     <span className={ isSubmitting ? "text-transparent" : ""}> {title}</span>
    </button>
  );
};
