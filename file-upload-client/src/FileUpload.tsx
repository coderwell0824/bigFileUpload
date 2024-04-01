import { useRef } from "react";
import { InboxOutlined } from "@ant-design/icons";
import "./fileUpload.scss";
import useDrag from "./hooks/useDarg";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  onChange(info) {
    const { status } = info.file;
    console.log(info, "initialized");
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

//文件无法拖拽
const FileUpload = () => {
  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          444444 Click or drag file to this area to upload11111
          sdddddmmmmmmmmm2222200000
        </p>
      </Dragger>
    </>
  );
};

export default FileUpload;
