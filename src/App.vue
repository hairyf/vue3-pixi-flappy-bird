<script lang="ts" setup>
import { provide, ref } from 'vue'
import Main from './layout/Main.vue'
import Background from './layout/Background.vue'
import Ground from './layout/Ground.vue'

import AlphaTransition from './components/AlphaTransition.vue'
import GameOver from './components/GameOver.vue'
import GameMenu from './components/GameMenu.vue'
import Game from './components/Game.vue'

const start = ref(false)
const gaming = ref(false)
const gameover = ref(false)

const score = ref(0)

// function called when the game starts
function onStart() {
  score.value = 0
  start.value = true
  gaming.value = true
  gameover.value = false
}

// function called when the game is over
function onOver() {
  gaming.value = false
  // show the gameover screen after a delay
  setTimeout(() => gameover.value = true, 500)
}

provide('score', score)
</script>

<template>
  <Main>
    <!-- apply blur effect if not gaming -->
    <Background :blur="!gaming" />
    <!-- game screen switching with alpha transition -->
    <AlphaTransition>
      <GameMenu v-if="!start" @start="onStart" />
      <Game v-if="gaming" @over="onOver" />
      <GameOver v-if="gameover" @restart="onStart" />
    </AlphaTransition>
    <Ground />
  </Main>
</template>
