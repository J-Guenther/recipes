<script setup>
import { ref, computed } from 'vue'
import RecipeRow from '../components/RecipeRow.vue'
import RecipeModal from '../components/RecipeModal.vue'
import recipes from '../data/recipes.json'
import { tagStyle } from '../data/tagColors.js'

const QUICK_FILTERS = ['pasta', 'tofu', 'vegan', 'drinks', 'quick', 'soup', 'dessert', 'dip', 'salad']

const query = ref('')
const activeFilters = ref([])
const selected = ref(null)

function toggleFilter(f) {
  if (activeFilters.value.includes(f)) {
    activeFilters.value = activeFilters.value.filter(x => x !== f)
  } else {
    activeFilters.value = [...activeFilters.value, f]
  }
}

const filtered = computed(() => {
  const q = query.value.toLowerCase().trim()
  return recipes.filter(r => {
    const matchQuery = !q || r.name.toLowerCase().includes(q) || r.tags.some(t => t.includes(q)) || r.ingredients.some(i => i.toLowerCase().includes(q))
    const matchFilters = activeFilters.value.length === 0 || activeFilters.value.every(f => r.tags.includes(f))
    return matchQuery && matchFilters
  })
})
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header-title">
        <span class="title-text">Recipes</span>
        <span class="title-count">{{ recipes.length }} dishes</span>
      </div>
      <div class="header-sub">
        <span class="accent-dot" />
        Personal cookbook
      </div>
    </header>

    <main class="main">
      <!-- Search + filters -->
      <div class="search-area">
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input
            v-model="query"
            placeholder="Search recipes…"
            class="search-input"
          />
          <button v-if="query" class="clear-btn" @click="query = ''">✕</button>
        </div>

        <div class="filter-strip">
          <span class="filter-label">Filter:</span>
          <button
            v-for="f in QUICK_FILTERS"
            :key="f"
            class="filter-btn"
            :class="{ active: activeFilters.includes(f) }"
            :style="activeFilters.includes(f)
              ? { background: tagStyle(f).bg, borderColor: tagStyle(f).dot }
              : {}"
            @click="toggleFilter(f)"
          >{{ f }}</button>
          <button
            v-if="activeFilters.length > 0"
            class="filter-btn clear-filter"
            @click="activeFilters = []"
          >✕ Clear</button>
        </div>
      </div>

      <!-- Table -->
      <div class="table-wrap">
        <!-- Desktop header -->
        <div class="table-header">
          <span>Recipe</span>
          <span>Tags</span>
          <span>Time</span>
          <span>Difficulty</span>
        </div>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="empty">
          <div class="empty-icon">🍽</div>
          <p class="empty-title">No recipes found</p>
          <p class="empty-sub">Try a different search or clear your filters</p>
        </div>

        <!-- Rows -->
        <RecipeRow
          v-else
          v-for="(recipe, i) in filtered"
          :key="recipe.id"
          :recipe="recipe"
          :is-last="i === filtered.length - 1"
          @click="selected = recipe"
        />
      </div>

      <p v-if="filtered.length > 0" class="result-count">
        {{ filtered.length }} of {{ recipes.length }} recipes
      </p>
    </main>

    <RecipeModal v-if="selected" :recipe="selected" @close="selected = null" />
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  background: var(--cream);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.title-text {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--charcoal);
  letter-spacing: -0.01em;
}
.title-count {
  font-size: 12px;
  color: var(--charcoal-light);
}
.header-sub {
  display: none;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--charcoal-light);
}
.accent-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--terra);
}

/* Main */
.main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 12px 60px;
}

/* Search */
.search-area {
  margin-bottom: 16px;
}
.search-wrap {
  position: relative;
  margin-bottom: 10px;
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--charcoal-light);
  font-size: 15px;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 11px 14px 11px 38px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  background: white;
  border: 1.5px solid var(--cream-border);
  border-radius: 10px;
  outline: none;
  color: var(--charcoal);
  transition: border-color 0.15s;
  box-shadow: 0 1px 4px oklch(0.18 0.01 60 / 0.04);
}
.search-input:focus {
  border-color: var(--terra);
}
.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--cream-dark);
  border: none;
  cursor: pointer;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: var(--charcoal-light);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Filter strip */
.filter-strip {
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex-wrap: nowrap;
  padding-bottom: 4px;
}
.filter-strip::-webkit-scrollbar {
  display: none;
}
.filter-label {
  display: none;
  font-size: 12px;
  color: var(--charcoal-light);
  flex-shrink: 0;
  margin-right: 4px;
}
.filter-btn {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1.5px solid var(--cream-border);
  background: white;
  color: var(--charcoal-mid);
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
  text-transform: capitalize;
  flex-shrink: 0;
}
.filter-btn.active {
  color: var(--charcoal);
}
.clear-filter {
  color: var(--charcoal-light);
  background: transparent;
}

/* Table */
.table-wrap {
  background: white;
  border-radius: 10px;
  border: 1px solid var(--cream-border);
  overflow: hidden;
  box-shadow: 0 2px 12px oklch(0.18 0.01 60 / 0.05);
}
.table-header {
  display: none;
}

/* Empty */
.empty {
  padding: 48px 20px;
  text-align: center;
  color: var(--charcoal-light);
}
.empty-icon {
  font-size: 28px;
  margin-bottom: 10px;
}
.empty-title {
  font-size: 15px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}
.empty-sub {
  font-size: 12px;
  margin-top: 4px;
}

/* Result count */
.result-count {
  font-size: 11px;
  color: var(--charcoal-light);
  margin-top: 12px;
  text-align: right;
}

/* Desktop */
@media (min-width: 640px) {
  .header {
    padding: 0 48px;
    height: 64px;
  }
  .title-text {
    font-size: 22px;
  }
  .header-sub {
    display: flex;
  }
  .main {
    padding: 40px 48px 80px;
  }
  .search-area {
    margin-bottom: 28px;
  }
  .search-input {
    padding: 13px 16px 13px 42px;
  }
  .filter-strip {
    flex-wrap: wrap;
    padding-bottom: 0;
  }
  .filter-label {
    display: inline;
  }
  .table-wrap {
    border-radius: 14px;
  }
  .table-header {
    display: grid;
    grid-template-columns: 1fr 200px 80px 90px;
    padding: 10px 20px;
    background: var(--cream);
    border-bottom: 1px solid var(--cream-border);
    font-size: 11px;
    font-weight: 500;
    color: var(--charcoal-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}
</style>