<template>
  <div class="container-fluid text-center py-3 mb-4">
    <div class="row justify-content-center mx-5">
      <div class="col-lg-8 col-md-12 justify-content-center shadow p-3 rounded-pill">
        <div v-for="category in categories" :key="category.id" class="form-check form-check-inline">
          <input class="form-check-input shadow-sm" type="checkbox" :id="'inlineCheckbox' + category.id" :value="category.name"
            v-model="selectedCategories" @change="applyFilters">
          <label class="form-check-label fw-3" :for="'inlineCheckbox' + category.id">{{ category.name }}</label>
        </div>
      </div>
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
