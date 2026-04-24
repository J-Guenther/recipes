<script setup>
import { computed } from 'vue'
import { tagStyle } from '../data/tagColors.js'

const props = defineProps({ label: String })
const style = computed(() => tagStyle(props.label))
</script>

<template>
  <span class="tag" :style="{ background: style.bg, color: style.fg }">
    <span class="tag-dot" :style="{ background: style.dot }" />
    {{ label }}
  </span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  text-transform: capitalize;
  white-space: nowrap;
}
.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
</style>