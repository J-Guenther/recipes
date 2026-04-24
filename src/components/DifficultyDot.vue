<script setup>
const props = defineProps({ level: String })
const map = { Easy: 1, Medium: 2, Hard: 3 }
const n = map[props.level] || 1
</script>

<template>
  <span class="dots">
    <span
      v-for="i in 3"
      :key="i"
      class="dot"
      :style="{ background: i <= n ? 'var(--terra)' : 'var(--cream-border)' }"
    />
  </span>
</template>

<style scoped>
.dots {
  display: inline-flex;
  gap: 3px;
  align-items: center;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>