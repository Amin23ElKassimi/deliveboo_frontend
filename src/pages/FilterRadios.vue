<template>
  <div>
    <div v-for="category in categories" :key="category.id" class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" :id="'inlineCheckbox' + category.id" :value="category.name"
        v-model="selectedCategories" @change="applyFilters">
      <label class="form-check-label" :for="'inlineCheckbox' + category.id">{{ category.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedCategories: [] // Usato per tenere traccia delle categorie selezionate
    };
  },
  methods: {
    applyFilters() {
      // Se non è selezionata nessuna categoria, emetti un array vuoto
      if (this.selectedCategories.length === 0) {
        this.$emit('filter', []);
      } else {
        // Altrimenti, emetti solo le categorie selezionate
        this.$emit('filter', this.selectedCategories);
      }
    }
  }
};
</script>

<style lang="">
</style>
