<template>
  <div>
    <div v-for="category in categories" :key="category.id" class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" :id="'inlineCheckbox' + category.id" :value="category.name" v-model="selectedCategories" @change="applyFilters">
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
      if (this.selectedCategories.length === 0) {
        // Se non è selezionata nessuna categoria, invia tutte le categorie
        const allCategories = this.categories.map(category => category.name);
        this.$emit('filter', allCategories);
      } else {
        // Altrimenti, invia solo le categorie selezionate
        this.$emit('filter', this.selectedCategories);
      }
    }
  }
};
</script>

<style lang="">
</style>
