<template>

  <div class="w-screen h-screen">

    <div class="h-full flex justify-center items-center flex flex-col gap-1">

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
        <input v-if="waiting" id="textbox" type="text" placeholder="Command" v-model="textValue"
               @keypress.enter="sendText"
               class="h-10 animate-fade-in box"/>
      </div>

    </div>


  </div>


</template>

<script>

import OpenAI from "openai";
import {getText} from "@/assets/js/data";

// TODO temp solution
let key = process.env.VUE_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true
});

export default {
  name: 'App',
  data() {
    return {
      output: "",
      words: [],
      wordsIdx: 0,
      timeout: 700,
      speaking: false,
      waiting: false,
      textValue: "",
    }
  },
  mounted() {
    this.run("what are your commands?")
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

      this.words = sentence.replace(/[.,?@'#]/g, '').split(" ");

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
      console.log(word);
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
    },
    async sendText() {
      console.log(this.textValue);
      document.getElementById('textbox').style.animation = "fadeOut 1s";

      if (this.textValue < 0) {
        return;
      }

      let check = getText(this.textValue);

      if (check !== null) {
        this.run(check);
        return;
      }

      let wrapper = "answer the following in 12 words or less: " + this.textValue;

      const completion = await openai.chat.completions.create({
        messages: [{role: "user", content: wrapper}],
        model: "gpt-3.5-turbo",
        max_tokens: 50,
      });

      this.run(completion.choices[0].message.content);
    }
  }
}
</script>

<style>
.box {
  @apply w-full px-3 py-2 border border-accentFaded rounded-lg focus:outline-none bg-background text-gray-600 hover:border-accent;
}
</style>