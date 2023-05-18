<script lang="ts" setup>
import { onKeyDown, useEventListener, whenever } from '@vueuse/core'
import { SCALE_MODES, Texture } from 'pixi.js'
import { computed, ref, useModel } from 'vue'
import { tryMountTicker } from 'vue3-pixi'
import downPNG from '../assets/sprites/redbird-downflap.png'
import midPNG from '../assets/sprites/redbird-midflap.png'
import upPNG from '../assets/sprites/redbird-upflap.png'
import { audios } from '../config'

const props = defineProps<{
  x: number
  y: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (name: 'die'): void
  (name: 'update:x', x: number): void
  (name: 'update:y', y: number): void
}>()

const x = useModel(props, 'x')
const y = useModel(props, 'y')

const resolves = {
  down: Texture.from(downPNG, { scaleMode: SCALE_MODES.NEAREST }),
  mid: Texture.from(midPNG, { scaleMode: SCALE_MODES.NEAREST }),
  up: Texture.from(upPNG, { scaleMode: SCALE_MODES.NEAREST }),
}
const velocity = ref(-6)
const gravity = 0.4

const texture = computed(() => {
  return velocity.value < -2
    ? resolves.up
    : velocity.value < 2
      ? resolves.mid
      : resolves.down
})

// ticker function to update position and velocity
const remove = tryMountTicker((dt) => {
  // move down gradually
  y.value += velocity.value * dt
  // apply gravity
  velocity.value += gravity * dt
})

function jump() {
  if (props.disabled)
    return
  audios.wing.play()
  // jump upwards when clicked, negative velocity indicates upward direction
  velocity.value = -8
}


// listen for space bar key press to jump
onKeyDown(' ', jump)
// listen for click event to jump
useEventListener('click', jump)

// when hitting the ground, player dies
whenever(
  () => y.value > 379,
  () => {
    y.value = 379
    velocity.value = 0
    audios.hit.play()
    emit('die')
    remove()
  },
)

// when hitting the ceiling, player bounces back
whenever(
  () => y.value < 10,
  () => {
    y.value = 10
    velocity.value = 0
  },
)
</script>

<template>
  <sprite :x="x" :y="y" :texture="texture" :anchor-x="0.5" :anchor-y="0.5" />
</template>

<style lang="scss" scoped></style>
