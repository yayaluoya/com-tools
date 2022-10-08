<template>
  <Editor
    api-key="no-api-key"
    :init="init"
    v-model="content_"
    tag-name="div"
    :disabled="disabled"
  />
</template>
 
 
<script>
import Editor from "@tinymce/tinymce-vue";

/** 提取富文本图片内容路径 */
const imgRegExp = /<img.*?src="(.*?)".*?\/>/g;

export default {
  components: { Editor },
  props: {
    disabled: {
      type: Boolean,
      defalut: false,
    },
    content: {
      type: String,
      defalut: "",
    },
    imgUpload: Function,
    imgRemove: Function,
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/langs/zh-Hans.js", //引入语言包文件
        language: "zh-Hans", //语言类型
        height: 360,
        menubar: false,
        plugins: [
          "advlist autolink lists link charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "table paste code help wordcount image",
        ],
        toolbar_mode: "sliding",
        toolbar:
          "undo redo | formatselect | bold italic backcolor | image | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
        images_upload_handler: (blobInfo, success, failure) => {
          // console.log(blobInfo);
          if (this.imgUpload) {
            this.imgUpload(new File([blobInfo.blob()], blobInfo.filename()))
              .then((url) => {
                success(url);
              })
              .catch(() => {
                failure("上传错误");
              });
          } else {
            const img = "data:image/jpeg;base64," + blobInfo.base64();
            success(img);
          }
        },
      },
    };
  },
  computed: {
    content_: {
      get() {
        return this.content || "";
      },
      set(value) {
        let imgs = [...this.content_.matchAll(imgRegExp)]
          .map((_) => {
            return _[1] || "";
          })
          .filter(Boolean);
        let onImgs = [...value.matchAll(imgRegExp)]
          .map((_) => {
            return _[1] || "";
          })
          .filter(Boolean);
        //提取出两个图片内容的差异
        imgs
          .filter((_) => {
            return !onImgs.includes(_);
          })
          .forEach((_) => {
            this.imgRemove?.(_);
          });
        //
        this.$emit("update:content", value);
      },
    },
  },
};
</script>

<style>
.tox {
  z-index: 9999 !important;
}
</style>