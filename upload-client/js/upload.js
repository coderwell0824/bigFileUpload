

/* 基于FORM-DATA实现文件上传 */
(function () {
  const upload = document.querySelector("#upload1");
  const uploadInput = upload.querySelector(".upload_inp");
  const uploadBtnSelect = upload.querySelector(".upload_button.select");
  const uploadBtn = upload.querySelector(".upload_button.upload");
  const uploadTip = upload.querySelector(".upload_tip");
  const uploadList = upload.querySelector(".upload_list");

  //点击选择文件按钮, 触发上传文件input框选择文件的行为
  uploadBtnSelect.addEventListener("click", () => {
    uploadInput.click();
  })

  //监听用户选择文件的操作
  uploadInput.addEventListener("change", (event) => {

    //获取用户选中的文件
    if (!uploadInput.files.length) return
    let file = uploadInput.files[0];

    //限制文件上传的格式
    if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
      alert("上传的格式只能是PNG|JPG|JPEG格式")
      return
    }

    //限制文件上传的大小
    if (file.size > 2 * 1024 * 1024) {
      alert("上传的大小不能超过2MB")
      return
    }

    //显示上传的文件
    uploadTip.style.display = "none";
    uploadList.style.display = "block";
    uploadList.innerHTML = ` 
    <li>
      <span>文件：${file.name}</span>
      <span><em>移除</em></span>
    </li>`;


  })

  //移除按钮
  uploadList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.nodeName == "EM") {
      uploadTip.style.display = "block";
      uploadList.style.display = "none";
      uploadList.innerHTML = "";
    }
  })

  //上传到服务器



})()


