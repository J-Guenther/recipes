<script setup>
import { ref } from 'vue'
import Tag from './Tag.vue'
import DifficultyDot from './DifficultyDot.vue'

defineProps({
  recipe: Object,
  isLast: Boolean,
})

defineEmits(['click'])

const hovered = ref(false)
</script>

<template>
  <!-- Mobile -->
  <div
    class="row row-mobile"
    :class="{ hovered, 'no-border': isLast }"
    @click="$emit('click')"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="row-mobile-top">
      <p class="recipe-name" :class="{ 'name-hovered': hovered }">{{ recipe.name }}</p>
    </div>
    <div class="tags-row">
      <Tag v-for="t in recipe.tags.slice(0, 3)" :key="t" :label="t" />
    </div>
  </div>

  <!-- Desktop -->
  <div
    class="row row-desktop"
    :class="{ hovered, 'no-border': isLast }"
    @click="$emit('click')"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div>
      <p class="recipe-name" :class="{ 'name-hovered': hovered }">{{ recipe.name }}</p>
      <p class="recipe-desc">
        {{ recipe.description.slice(0, 72) }}{{ recipe.description.length > 72 ? '…' : '' }}
      </p>
    </div>
    <div class="tags-row">
      <Tag v-for="t in recipe.tags.slice(0, 3)" :key="t" :label="t" />
    </div>
    <div class="difficulty-cell">
      <DifficultyDot :level="recipe.difficulty" />
      <span class="difficulty-label">{{ recipe.difficulty }}</span>
    </div>
  </div>
</template>

<style scoped>
.row {
  cursor: pointer;
  transition: background 0.12s;
  background: white;
}
.row.hovered {
  background: var(--cream);
}
.row.no-border {
  border-bottom: none !important;
}

/* Mobile */
.row-mobile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  border-bottom: 1px solid var(--cream-dark);
}
.row-desktop {
  display: none;
}

.row-mobile-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.recipe-name {
  font-family: 'Playfair Display', serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--charcoal);
  transition: color 0.12s;
}
.recipe-name.name-hovered {
  color: var(--terra);
}

/* Desktop */
@media (min-width: 640px) {
  .row-mobile {
    display: none;
  }
  .row-desktop {
    display: grid;
    grid-template-columns: 1fr 200px 90px;
    padding: 18px 20px;
    border-bottom: 1px solid var(--cream-dark);
    align-items: center;
  }
  .recipe-name {
    font-size: 16px;
    margin-bottom: 2px;
  }
  .recipe-desc {
    font-size: 12px;
    color: var(--charcoal-light);
    line-height: 1.4;
  }
  .difficulty-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .difficulty-label {
    font-size: 12px;
    color: var(--charcoal-light);
  }
}
</style>