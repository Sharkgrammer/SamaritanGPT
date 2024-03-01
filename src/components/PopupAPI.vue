<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">

    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-auto">

      <div class="flex flex-col items-center">
        <h2 class="text-lg font-semibold mb-4">Samaritan v1.1</h2>

        <p class="mb-4">A Person of Interest Samaritan inspired web UI for accessing ChatGPT.</p>

        <img src="@/assets/img/samaritan.svg" class="h-10 animate-gentle-fade mb-4"/>

        <p :key="keyExists" class="mb-4">For most features, Samaritan requires access to the ChatGPT API.
          <span
              v-if="keyExists">You already have an API key set but you can change it below. Leave blank to remove.</span>
          <span
              v-else>To use it, please enter an API key below. If you don't, Samaritan has a small list of responses.</span>
        </p>

        <input id="textbox" type="text" placeholder="API key" v-model="textValue"
               class="h-10 box mb-6"/>

        <p class="mb-6">Samaritan can store this key for future sessions using Vuex. Otherwise it will forget it once
          you close the tab.</p>

        <input id="checkbox" type="checkbox" placeholder="API key" v-model="boxValue"
               class="h-8 box mb-6 bg-accent"/>


        <p class="mb-6">Samaritan uses Vuex and session cookies to store data like your key and if you've already seen
          this popup.</p>

        <div class="grid grid-cols-2 gap-2">
          <button
              class="bg-background text-accent border-accent hover:bg-accent hover:text-background hover:border-background border font-bold py-1 px-2 rounded"
              @click="closeModal(true)">Save
          </button>

          <button
              class="bg-background text-accent border-accent hover:bg-accent hover:text-background hover:border-background border font-bold py-1 px-2 rounded"
              @click="closeModal(false)">Close
          </button>
        </div>


      </div>
    </div>

  </div>

  <div class="fixed inset-0 bg-black opacity-50"/>

</template>

<script>
import * as utils from "@/assets/js/utility";

export default {
  name: "PopupUI",
  emits: ['close'],
  data() {
    return {
      textValue: "",
      boxValue: "",
      keyExists: false,
    }
  },
  mounted() {
    this.keyExists = utils.getKey(this).length > 0;
    this.boxValue = utils.getSave(this);
  },
  methods: {
    closeModal(save) {
      if (save) {
        utils.setData(this, this.textValue, this.boxValue);
      }

      utils.setPopup(this, true);

      this.$emit("close");
    }
  }
}
</script>

<style scoped>
.box {
  @apply w-full px-3 py-2 border border-accent rounded-lg focus:outline-none bg-background text-gray-600 hover:border-accent;
}
</style>