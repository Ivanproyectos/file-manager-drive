import React from 'react'

export const FileDropZone = () => {
  return (
    <div
      id="attachFilesNewProjectLabel"
      className="js-dropzone dz-dropzone dz-dropzone-card"
    >
      <div className="dz-message">
        <img
          className="avatar avatar-xl avatar-4x3 mb-3"
          src="../assets/svg/illustrations/oc-browse.svg"
          alt="Image Description"
          data-hs-theme-appearance="default"
        />
        <img
          className="avatar avatar-xl avatar-4x3 mb-3"
          src="../assets/svg/illustrations-light/oc-browse.svg"
          alt="Image Description"
          data-hs-theme-appearance="dark"
        />

        <h5>Drag and drop your file here</h5>

        <p className="mb-2">or</p>

        <span className="btn btn-white btn-sm">Browse files</span>
      </div>
    </div>
  

  )
}
