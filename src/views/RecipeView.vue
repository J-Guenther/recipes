<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Tag from '../components/Tag.vue'
import recipes from '../data/recipes.json'

const route = useRoute()
const router = useRouter()

const recipe = computed(() => recipes.find(r => r.id === Number(route.params.id)))

function goBack() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        <span class="back-label">Recipes</span>
      </button>
    </header>

    <div v-if="!recipe" class="not-found">
      <p>Recipe not found.</p>
      <button @click="goBack">Back to recipes</button>
    </div>

    <main v-else class="main">
      <div class="card">
        <!-- Sticky card header -->
        <div class="card-header">
          <div class="tags-row">
            <Tag v-for="t in recipe.tags" :key="t" :label="t" />
          </div>
          <h1 class="recipe-title">{{ recipe.name }}</h1>
          <p class="recipe-desc">{{ recipe.description }}</p>
          <div class="meta-row">
            <span class="meta-item"><span class="meta-icon">⏱</span> {{ recipe.time }}</span>
            <span class="meta-item"><span class="meta-icon">🍽</span> {{ recipe.servings }} srv</span>
            <span class="meta-item"><span class="meta-icon">●</span> {{ recipe.difficulty }}</span>
          </div>
        </div>

        <div class="card-body">
          <!-- Ingredients -->
          <section class="section">
            <h2 class="section-title">
              <span class="section-bar" />
              Ingredients
            </h2>
            <div class="ingredients-grid">
              <div
                v-for="(ing, i) in recipe.ingredients"
                :key="i"
                class="ingredient-row"
              >
                <span class="ingredient-dot">◆</span>
                {{ ing }}
              </div>
            </div>
          </section>

          <!-- Steps -->
          <section class="section">
            <h2 class="section-title">
              <span class="section-bar" />
              Method
            </h2>
            <ol class="steps-list">
              <li v-for="(step, i) in recipe.steps" :key="i" class="step-item">
                <span class="step-num">{{ i + 1 }}</span>
                <p class="step-text">{{ step }}</p>
              </li>
            </ol>
          </section>

          <!-- Notes -->
          <section v-if="recipe.notes" class="section" :class="{ 'no-margin': !recipe.source }">
            <div class="note-box">
              <p class="note-label">Note</p>
              <p class="note-text">{{ recipe.notes }}</p>
            </div>
          </section>

          <!-- Source -->
          <div v-if="recipe.source" class="source-row">
            <a :href="recipe.source" target="_blank" rel="noreferrer" class="source-link">
              <span>↗</span> View Source
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--cream);
}

/* Header */
.header {
  border-bottom: 1px solid var(--cream-border);
  padding: 0 16px;
  height: 52px;
  display: flex;
  align-items: center;
  background: var(--cream);
  position: sticky;
  top: 0;
  z-index: 100;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--charcoal-mid);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  padding: 6px 0;
  transition: color 0.15s;
}
.back-btn:hover {
  color: var(--terra);
}
.back-arrow {
  font-size: 16px;
}

/* Not found */
.not-found {
  padding: 60px 20px;
  text-align: center;
  color: var(--charcoal-light);
}

/* Main */
.main {
  max-width: 680px;
  margin: 0 auto;
  padding: 24px 12px 60px;
}

/* Card */
.card {
  background: white;
  border-radius: 14px;
  border: 1px solid var(--cream-border);
  overflow: hidden;
  box-shadow: 0 2px 12px oklch(0.18 0.01 60 / 0.05);
}

.card-header {
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--cream-border);
  background: var(--cream);
}

.tags-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.recipe-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--charcoal);
  margin-bottom: 8px;
}

.recipe-desc {
  color: var(--charcoal-mid);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.meta-row {
  display: flex;
  gap: 20px;
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

/* Card body */
.card-body {
  padding: 24px 20px;
}

/* Sections */
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
}

/* Ingredients */
.ingredients-grid {
  display: grid;
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

/* Steps */
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

/* Notes */
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

/* Source */
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

/* Desktop */
@media (min-width: 640px) {
  .header {
    padding: 0 48px;
    height: 64px;
  }
  .main {
    padding: 40px 48px 80px;
  }
  .card-header {
    padding: 36px 40px 20px;
  }
  .card-body {
    padding: 24px 40px;
  }
  .recipe-title {
    font-size: 30px;
  }
  .ingredients-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px 24px;
  }
}
</style>