<template>

  <div :class="getShove()" class="h-14">
    <h1 class="text-5xl uppercase font-bold h-12">{{ output }}</h1>

    <div class="border-2 border-black mx-1" :class="{'w-20' : waiting}"/>
  </div>

  <div :key="speaking" class="h-14">
    <img src="@/assets/img/samaritan.svg" class="h-10" :class="{
          'animate-fade' : speaking,
          'animate-gentle-fade' : !speaking
        } "/>
  </div>


  <div class="pt-10 h-14">
    <input v-if="waiting && !wait" id="textbox" type="text" placeholder="Command" v-model="textValue"
           @keypress.enter="sendText" :disabled="disabled"
           class="h-10 animate-fade-in box"/>
  </div>

</template>

<script>
import OpenAI from "openai";
import {getText} from "@/assets/js/data";
import * as utils from "@/assets/js/utility";

export default {
  name: "ConsoleUI",
  props: {
    api: {
      type: String,
      default: "",
      required: true,
    },
    wait: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      output: "",
      words: [],
      wordsIdx: 0,
      timeout: 700,
      speaking: false,
      waiting: false,
      textValue: "",
      disabled: false,
    }
  },
  mounted() {
    if (!this.wait) {
      this.run("what are your commands?")
    } else {
      this.stopSpeaking();
    }
  },
  methods: {
    run(sentence) {
      this.parseWords(sentence);

      this.startSpeaking();
      this.speak(this.words[this.wordsIdx++]);

      if (this.words.length !== this.wordsIdx) {
        this.speakTimeout(this);
      } else {
        this.stopSpeakingTimeout(this);
      }
    },
    parseWords(sentence) {
      let temp = sentence.split(" ");
      let lastWord = temp[temp.length - 1];

      this.words = sentence.replace(/[.,?@'#\-=+]/g, '').split(" ");

      if (lastWord.includes("?")) {
        this.words.push("?");
      }
    },
    speakTimeout(context) {

      setTimeout(function () {
        context.speak(context.words[context.wordsIdx++]);

        if (context.wordsIdx < context.words.length) {
          context.speakTimeout(context);
        } else {
          context.stopSpeakingTimeout(context);
        }

      }, this.timeout);

    },
    speak(word) {
      this.output = word;
    },
    getShove() {
      let len = this.output.length;
      let pad = "pl-0";

      if (len > 3 && len <= 5) {
        pad = "pl-5";
      } else if (len > 5 && len <= 7) {
        pad = "pl-10";
      } else if (len >= 8) {
        pad = "pl-20";
      }

      return pad;
    },
    startSpeaking() {
      this.speaking = true;
      this.waiting = false;
      this.textValue = "";
    },
    stopSpeakingTimeout(context) {

      setTimeout(function () {
        context.stopSpeaking();
      }, this.timeout);
    },
    stopSpeaking() {
      this.output = "";
      this.speaking = false;
      this.waiting = true;
      this.words = [];
      this.wordsIdx = 0;
      this.disabled = false;
    },
    async sendText() {
      document.getElementById('textbox').style.animation = "fadeOut 1s";

      if (this.textValue < 0) {
        return;
      }

      this.disabled = true;

      let check = getText(this.textValue);

      if (check !== null) {
        this.run(check);
        return;
      }

      try {
        const openai = new OpenAI({
          apiKey: utils.getKey(this),
          dangerouslyAllowBrowser: true
        });

        let wrapper = "answer the following in 10 words or less: " + this.textValue;

        const completion = await openai.chat.completions.create({
          messages: [{role: "user", content: wrapper}],
          model: "gpt-3.5-turbo",
          max_tokens: 50,
        });

        this.run(completion.choices[0].message.content);
      } catch (e) {
        this.run("cannot access ai need valid api key");
      }


    }
  }
}
</script>

<style>
.box {
  @apply w-full px-3 py-2 border border-accentFaded rounded-lg focus:outline-none bg-background text-gray-600 hover:border-accent;
}
</style>>