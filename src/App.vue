<template>

  <div class="w-screen h-screen">

    <div class="h-full flex justify-center items-center flex flex-col gap-1">

      <ConsoleUI :key="forceWait" :api="key" :wait="forceWait"/>

    </div>

  </div>

  <div class="absolute top-2 right-2 p-2 cursor-pointer" @mouseenter="hover = true"
       @mouseleave="hover = false" @click="openPopup">
    <!-- poor hacky lazy workaround -->
    <img src="@/assets/img/setting_red.svg" v-if="hover"/>
    <img src="@/assets/img/setting.svg" v-else/>
  </div>

  <PopupUI v-if="showPopup" @close="closePopup"/>

</template>

<script>


import ConsoleUI from "@/components/ConsoleUI";
import PopupUI from "@/components/PopupAPI";
import * as utils from "@/assets/js/utility";

export default {
  name: 'App',
  components: {PopupUI, ConsoleUI},
  data() {
    return {
      hover: false,
      forceWait: false,
      showPopup: false,
      key: "",
    }
  },
  mounted() {
    this.key = this.checkKey();

    if (!utils.getSeenPopup(this)) {
      this.openPopup();
    }
  },
  methods: {
    checkKey() {
      return "";
    },
    openPopup() {
      this.forceWait = true;
      this.showPopup = true;
    },
    closePopup() {
      this.forceWait = this.showPopup = false;
    }
  }
}
</script>

<style>

</style>

