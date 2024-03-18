<template lang="">
    <main class="container-fluid">
      
      <jumbo class="row d-flex justify-content-center align-items-center mb-5">
        <div class="col-5 text-center">
          <h4 class="text-jumbo text-white lh-base">
            DeliveBoo offre una vasta selezione di ristoranti! <br/>
            Scegli la pietanza che desideri!<br/>
            Ordina!<br/>
            Valuta il servizio! <br/>
            DeliveBoo si distingue per la sua convenienza, scelta e qualità,
            diventando una soluzione ideale per soddisfare ogni pasto! 
          </h4>
        </div>
        <div class="jumbotron col-3 jumbotron-fluid">
            <img class="card-img jumbo-img rounded-circle z-0" src="/Logo_Deliveboo.jpg" alt="Jumbo immagine">
        </div>
      </jumbo>
      <!-- Sezione principale -->
      <section class="container">
        <!-- Componente FilterRadios per i filtri -->
        <FilterRadios :categories="categories" @filter="handleFilter" />
      </section>
  
      <!-- Lista di SingleCard da stampare -->
      <div class="lista row justify-content-center"> 
        <!-- Iterazione su tutte le SingleCard filtrate -->
        <SingleCard v-for="restaurant in filteredItems" v-show="elementToShow(restaurant.categories)" :key="restaurant.id"
          :name="restaurant.name" :vat="restaurant.vat"
          :category="restaurant.categories"
          :address="restaurant.address" :email="restaurant.email"
          :image_url="restaurant.image_url" :phone_number="restaurant.phone_number"
          :linkRoute="{ name: 'single-restaurant', params: { id: restaurant.id}}" linkLabel="Menu" />
      </div>
    </main>
  </template>

<script>
import SingleCard from '@/components/SingleCard.vue';
import SingleRestaurant from './SingleRestaurant.vue';
import FilterRadios from './FilterRadios.vue';
import axios from 'axios';

export default {
  name: 'RestaurantList',

  data() {
    return {
      searchQuery: '', // Query per la ricerca
      restaurants: [], // Elenco dei ristoranti
      categories: [], // Elenco delle categorie
      categoriesToFilter: 'all', // Categoria selezionata per il filtro
      filteredItems: [] // Elementi filtrati da mostrare
    };
  },

  methods: {
    // Ottiene la lista dei ristoranti
    getRestaurants() {
      axios.get('http://127.0.0.1:8000/api/restaurants')
        .then(response => {
          this.restaurants = response.data.results.data;
          // Al caricamento iniziale, mostra tutti i ristoranti
          this.filteredItems = this.restaurants;
        })
        .catch(error => {
          console.warn(error);
        });
    },

    // Ottiene la lista delle categorie
    getCategories() {
      axios.get('http://127.0.0.1:8000/api/categories')
        .then(response => {
          this.categories = response.data.results.data;
        })
        .catch(error => {
          console.warn(error);
        });
    },

    // Determina se mostrare un elemento in base alla categoria selezionata
    elementToShow(categories) {
      if (this.categoriesToFilter.length === 0) {
        return true; // Mostra tutti se nessuna categoria è selezionata
      } else {
        // Verifica se almeno una categoria selezionata è inclusa nell'array delle categorie del ristorante
        return categories.some(c => this.categoriesToFilter.includes(c.name));
      }
    },
    // Gestisce il filtro delle categorie
    handleFilter(selectedCategories) {
      // Se nessuna categoria è selezionata, reimposta categoriesToFilter a 'all'
      if (selectedCategories.length === 0) {
        this.categoriesToFilter = 'all';
      } else {
        // Altrimenti, reimposta categoriesToFilter con le categorie selezionate
        this.categoriesToFilter = selectedCategories;
      }

      this.filteredItems = this.categoriesToFilter === 'all'
        ? this.restaurants
        : this.restaurants.filter(restaurant =>
          this.categoriesToFilter.every(category =>
            restaurant.categories.some(c => c.name === category)
          )
        );

      // Controlla se la ricerca per nome è attiva
      if (this.searchQuery) {
        this.searchCharacters();
      }
    },



  },

  // Componenti da importare 
  components: {
    SingleCard,
    SingleRestaurant,
    FilterRadios
  },

  created() {
    // Ottiene i dati al caricamento del componente
    this.getRestaurants();
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped></style>