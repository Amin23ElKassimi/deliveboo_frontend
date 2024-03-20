<template>
  <div class="row d-flex justify-content-center mb-5">
    <div class="col-10 text-center mb-3 container-category shadow">
      <h2 class="text-white mb-5">Filtra i Ristoranti per categoria e seleziona il ristorante che preferisci!</h2>
      <div v-for="category in categories" :key="category.id" class="form-check form-check-inline">
        <div class="category-checkbox" role="group" aria-label="Basic checkbox toggle button group"> 
          <input class="form-check-input d-none btn-check" type="checkbox" :id="'inlineCheckbox' + category.id" :value="category.name"
            v-model="selectedCategories" @change="applyFilters">
          <label class="form-check-label text-uppercase fw-bold shadow-sm btn btn-light rounded-pill border-0 shadow-lg" :for="'inlineCheckbox' + category.id">{{ category.name }}</label>
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

<style lang="scss" scoped>

  
</style>
