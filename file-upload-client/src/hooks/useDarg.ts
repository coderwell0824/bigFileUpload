import { useState, useEffect, useCallback } from "react"
import { message } from "antd"
import { MAX_FILE_SIZE } from "../constants"


const useDrag = (ref: React.MutableRefObject<HTMLDivElement>) => {

  const [selectedFile, setSelectedFile] = useState<Blob | null>(null); //用户选中的文件
  const [filePreview, setFilePreview] = useState({ url: "", type: "" });  //文件预览

  const checkFile = (files: any) => {
    const file = files[0];
    if (!file) {
      message.error("文件不存在")
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      message.warning("文件大小不能超过2GB")
      return
    }

    //限制文件的类型
    if (!(file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      message.warning("文件类型错误")
      return
    }
    setSelectedFile(file);
  }

  const handleDragEnter = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, [])
  const handleDragOver = useCallback(() => { }, [])

  const handleDrop = useCallback((e: any) => {
    console.log("111")
    e.preventDefault();
    e.stopPropagation();

    checkFile(e.dataTransfer.files)
  }, [])

  const handleDragLeave = () => { }

  useEffect(() => {
    if (!selectedFile) return
    const fileUrl = URL.createObjectURL(selectedFile!);
    setFilePreview({ url: fileUrl, type: selectedFile!.type })
    return () => {
      URL.revokeObjectURL(fileUrl);
    }
  }, [selectedFile])



  useEffect(() => {
    const uploadContainer = ref.current;
    console.log(uploadContainer, "uploadContainer");
    uploadContainer!.addEventListener("dragenter", handleDragEnter);
    uploadContainer!.addEventListener("click", handleDragEnter);
    uploadContainer?.addEventListener("dragover", handleDragOver);
    uploadContainer!.addEventListener("drag", handleDrop);
    uploadContainer.addEventListener("dragleave", handleDragLeave);

    return () => {
      uploadContainer.removeEventListener("dragenter", handleDragEnter);
      uploadContainer.removeEventListener("dragover", handleDragOver);
      uploadContainer.removeEventListener("drag", handleDrop);
      uploadContainer.removeEventListener("dragleave", handleDragLeave);
    }
  }, [])

  return [selectedFile, filePreview]

}

export default useDrag;