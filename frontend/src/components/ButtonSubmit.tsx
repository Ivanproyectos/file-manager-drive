import React from "react";

interface Props {
  title: string;
  isSubmitting: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export const ButtonSubmit = ({ title, onClick, isSubmitting }: Props) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`btn btn-primary d-flex justify-content-center align-items-center ${
        isSubmitting ? "text-transparent" : ""
      }`}
      disabled={isSubmitting}
    >
      <div
        className="spinner-border text-light status-spinner"
        role="status"
        hidden={!isSubmitting}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {title}
    </button>
  );
};
