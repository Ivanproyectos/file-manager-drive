import React from "react";

export const FolderDetailsForm  = () => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="projectNameNewProjectLabel" className="form-label">
          Folder{" "}
          <i
            className="bi-question-circle text-body ms-1"
            data-toggle="tooltip"
            data-placement="top"
            title="Displayed on public forums, such as Front."
          ></i>
        </label>

        <div className="input-group input-group-merge">
          <div className="input-group-prepend input-group-text">
            <i className="bi-folder"></i>
          </div>
          <input
            type="text"
            className="form-control"
            name="projectName"
            id="projectNameNewProjectLabel"
            placeholder="Ingrese el nombre del folder"
            aria-label="Ingrese el nombre del folder"
          />
        </div>
      </div>
      {/*End Form */}

      <div className="mb-4">
        <label className="form-label">
          Descripción <span className="form-label-secondary">(Optional)</span>
        </label>
        <textarea
          className="form-control"
          name="projectName"
          placeholder="Ingrese una descripción"
          aria-label="Ingrese una descripción"
        ></textarea>
      </div>

    
    </>
  );
};
