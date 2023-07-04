import React, { useCallback, useState, useEffect } from "react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { Upload } from "@mui/icons-material";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "15px",
  borderWidth: 2,
  borderRadius: 10,
  borderColor: "#E5E5ED",
  paddingTop: "5px",
  paddingBottom: "5px",
  backgroundColor: "transparent",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
  width: "260px",
  height: "80px",
};

function DropzoneComponent() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} className="h-[30px] w-[30px]" />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = baseStyle;

  return (
    <section>
      <div {...getRootProps({ style })}>
        {" "}
        <input {...getInputProps()} />
        <div>
          <p className="text-[12px] text-[#768396] font-semibold">
            {" "}
            <span className="font-semibold font-poppins  text-lime-600">
              Click to upload{" "}
            </span>
            or drag and drop <br />
            <span className="text-[11px] font-light ">
              PNG,JPG,PDF or any other document format
             
              (max.5mb)
            </span>
          </p>
        </div>
      </div>
      <aside>{thumbs}</aside>
    </section>
  );
}

export default DropzoneComponent;
