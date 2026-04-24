<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --cream: oklch(0.965 0.014 80);
  --cream-dark: oklch(0.93 0.018 75);
  --cream-border: oklch(0.87 0.022 72);
  --charcoal: oklch(0.18 0.01 60);
  --charcoal-mid: oklch(0.38 0.01 60);
  --charcoal-light: oklch(0.58 0.01 60);
  --terra: oklch(0.60 0.13 38);
  --terra-light: oklch(0.93 0.04 38);
  --sage: oklch(0.58 0.09 148);
  --sage-light: oklch(0.93 0.04 148);
  --sky: oklch(0.60 0.09 230);
  --sky-light: oklch(0.93 0.04 230);
  --plum: oklch(0.55 0.10 310);
  --plum-light: oklch(0.93 0.04 310);
  --amber: oklch(0.72 0.13 75);
  --amber-light: oklch(0.95 0.04 75);
}

html, body {
  height: 100%;
  background: var(--cream);
  color: var(--charcoal);
  font-family: 'DM Sans', sans-serif;
}

#app {
  min-height: 100vh;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--cream-border); border-radius: 3px; }
</style>