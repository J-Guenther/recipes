<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Tag from './Tag.vue'

defineProps({ recipe: Object })
const emit = defineEmits(['close'])

const isMobile = ref(window.innerWidth < 640)

function onResize() { isMobile.value = window.innerWidth < 640 }
function onKeydown(e) { if (e.key === 'Escape') emit('close') }

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
})

function onOverlayClick(e) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div class="overlay" :class="{ mobile: isMobile }" @click="onOverlayClick">
    <div class="sheet" :class="{ mobile: isMobile }">

      <div class="sheet-header" :class="{ mobile: isMobile }">
        <div v-if="isMobile" class="drag-handle" />
        <button class="close-btn" :class="{ mobile: isMobile }" @click="emit('close')">✕</button>

        <div class="tags-row">
          <Tag v-for="t in recipe.tags" :key="t" :label="t" />
        </div>
        <h2 class="recipe-title" :class="{ mobile: isMobile }">{{ recipe.name }}</h2>
        <p v-if="!isMobile" class="recipe-desc">{{ recipe.description }}</p>
        <div class="meta-row" :class="{ mobile: isMobile }">
          <span class="meta-item"><span class="meta-icon">⏱</span> {{ recipe.time }}</span>
          <span class="meta-item"><span class="meta-icon">🍽</span> {{ recipe.servings }} srv</span>
          <span class="meta-item"><span class="meta-icon">●</span> {{ recipe.difficulty }}</span>
        </div>
      </div>

      <div class="sheet-body" :class="{ mobile: isMobile }">
        <section class="section">
          <h3 class="section-title"><span class="section-bar" />Ingredients</h3>
          <div class="ingredients-grid" :class="{ mobile: isMobile }">
            <div v-for="(ing, i) in recipe.ingredients" :key="i" class="ingredient-row">
              <span class="ingredient-dot">◆</span>{{ ing }}
            </div>
          </div>
        </section>

        <section class="section">
          <h3 class="section-title"><span class="section-bar" />Method</h3>
          <ol class="steps-list">
            <li v-for="(step, i) in recipe.steps" :key="i" class="step-item">
              <span class="step-num">{{ i + 1 }}</span>
              <p class="step-text">{{ step }}</p>
            </li>
          </ol>
        </section>

        <section v-if="recipe.notes" class="section" :class="{ 'no-margin': !recipe.source }">
          <div class="note-box">
            <p class="note-label">Note</p>
            <p class="note-text">{{ recipe.notes }}</p>
          </div>
        </section>

        <div v-if="recipe.source" class="source-row">
          <a :href="recipe.source" target="_blank" rel="noreferrer" class="source-link">
            <span>↗</span> View Source
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: oklch(0.10 0.01 60 / 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.18s ease;
}
.overlay.mobile {
  align-items: flex-end;
  padding: 0;
}

.sheet {
  background: var(--cream);
  border-radius: 16px;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px oklch(0.10 0.01 60 / 0.35);
  animation: slideUp 0.22s ease;
  position: relative;
}
.sheet.mobile {
  border-radius: 16px 16px 0 0;
  max-width: 100%;
  max-height: 92vh;
  animation: slideUpMobile 0.25s ease;
}

.sheet-header {
  padding: 36px 40px 20px;
  border-bottom: 1px solid var(--cream-border);
  position: sticky;
  top: 0;
  background: var(--cream);
  z-index: 10;
  border-radius: 16px 16px 0 0;
}
.sheet-header.mobile {
  padding: 24px 20px 20px;
}

.drag-handle {
  width: 36px;
  height: 4px;
  background: var(--cream-border);
  border-radius: 2px;
  margin: 0 auto 16px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--cream-dark);
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--charcoal-mid);
  font-size: 16px;
  transition: background 0.15s;
  font-family: 'DM Sans', sans-serif;
}
.close-btn.mobile {
  top: 16px;
  right: 16px;
}
.close-btn:hover {
  background: var(--cream-border);
}

.tags-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.recipe-title {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--charcoal);
  margin-bottom: 6px;
}
.recipe-title.mobile {
  font-size: 22px;
}

.recipe-desc {
  color: var(--charcoal-mid);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.meta-row {
  display: flex;
  gap: 24px;
}
.meta-row.mobile {
  gap: 16px;
  margin-top: 10px;
}
.meta-item {
  font-size: 12px;
  color: var(--charcoal-light);
  display: flex;
  align-items: center;
  gap: 4px;
}
.meta-icon {
  opacity: 0.7;
}

.sheet-body {
  padding: 24px 40px;
}
.sheet-body.mobile {
  padding: 24px 20px;
}

.section {
  margin-bottom: 28px;
}
.section.no-margin {
  margin-bottom: 0;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--charcoal);
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-bar {
  width: 3px;
  height: 16px;
  background: var(--terra);
  border-radius: 2px;
  display: inline-block;
  flex-shrink: 0;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 24px;
}
.ingredients-grid.mobile {
  grid-template-columns: 1fr;
  gap: 0;
}
.ingredient-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--charcoal-mid);
  line-height: 1.5;
  padding: 6px 0;
  border-bottom: 1px solid var(--cream-dark);
}
.ingredient-dot {
  color: var(--terra);
  font-size: 9px;
  margin-top: 5px;
  flex-shrink: 0;
}

.steps-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.step-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.step-num {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--terra);
  color: white;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.step-text {
  font-size: 13px;
  line-height: 1.7;
  color: var(--charcoal-mid);
  padding-top: 3px;
}

.note-box {
  background: var(--terra-light);
  border-left: 3px solid var(--terra);
  border-radius: 0 8px 8px 0;
  padding: 12px 16px;
}
.note-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--terra);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.note-text {
  font-size: 13px;
  color: var(--charcoal-mid);
  line-height: 1.6;
}

.source-row {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--cream-border);
}
.source-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--terra);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  background: var(--terra-light);
  border-radius: 8px;
  transition: opacity 0.15s;
}
.source-link:hover {
  opacity: 0.8;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideUpMobile { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>