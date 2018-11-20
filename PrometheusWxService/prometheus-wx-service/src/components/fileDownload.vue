<template>
<div>
  <group title="试题下载" title-color="#2d8cf0" class="group_title">
    <cell title="长郡中学" class="title" is-link :border-intent="false" :arrow-direction="showContent001 ? 'up' : 'down'" @click.native="showContent001 = !showContent001"></cell>

    <template v-if="showContent001">
          <cell-box :border-intent="false" class="sub-item" is-link link="./git-cheatsheet.pdf">试题1</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题2</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题3</cell-box>
        </template>

    <cell title="雅礼中学" class="title" is-link :border-intent="false" :arrow-direction="showContent002 ? 'up' : 'down'" @click.native="showContent002 = !showContent002"></cell>

    <template v-if="showContent002">
          <cell-box :border-intent="false" class="sub-item">试题1</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题2</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题3</cell-box>
        </template>

    <cell title="师大附中" class="title" is-link :border-intent="false" :arrow-direction="showContent003 ? 'up' : 'down'" @click.native="showContent003 = !showContent003"></cell>

    <template v-if="showContent003">
          <cell-box :border-intent="false" class="sub-item">试题1</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题2</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题3</cell-box>
        </template>

    <cell title="长沙市一中" class="title" is-link :border-intent="false" :arrow-direction="showContent004 ? 'up' : 'down'" @click.native="showContent004 = !showContent004"></cell>

    <template v-if="showContent004">
          <cell-box :border-intent="false" class="sub-item">试题1</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题2</cell-box>
          <cell-box class="sub-item" is-link link="./git-cheatsheet.pdf">试题3</cell-box>
        </template>
  </group>
</div>
</template>


<script>
import {
  Cell,
  CellBox,
  Group
} from 'vux'

export default {
  mounted() {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellBox
  },
  methods: {

  },
  data() {
    return {
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false
    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
  font-size: 11px;
}

.title{
    text-align: left;
    font-size: 12px;
}

.group_title{
    font-size: 16px;
}

.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}

.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
