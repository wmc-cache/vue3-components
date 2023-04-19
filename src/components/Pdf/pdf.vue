<template>
  <div>
    <div id="printForm">
      123
      <el-input v-if="show" style="width: 200px;" type="textarea" v-model="value" placeholder=""></el-input>
      <div style="width: 200px;" v-else v-html="value">
      </div>
    </div>
    <button @click="show = !show">show</button>
    <button @click="downPage">pdf</button>
  </div>
</template>

<script lang="ts" setup>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import { ref } from "vue";
const props = defineProps({
  demo: {
    type: String,
    default: '',

  },
})
const value = ref('')
const show = ref(true)
function downPage() {
  show.value = false
  setTimeout(async () => {
    let title = new Date().getFullYear() + "" + new Date().getMonth() + 1;
    const canvas = await html2Canvas(document.querySelector("#printForm") as HTMLElement, { allowTaint: true })
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;
    let pageHeight = (contentWidth / 592.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    let imgWidth = 595.28;
    let imgHeight = (592.28 / contentWidth) * contentHeight;
    let pageData = canvas.toDataURL("image/jpeg", 1.0);
    let PDF = new JsPDF("p", "pt", "a4");
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) {
          PDF.addPage();
        }
      }
    }
    PDF.save(title + ".pdf");
    show.value = true
  }
  )
}


</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

