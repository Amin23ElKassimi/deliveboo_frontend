<template lang="">
    <main class="container-fluid">
      <!-- Sezione principale -->
      <section class="container">
        <!-- Componente FilterRadios per i filtri -->
        <FilterRadios :categories="categories" @filter="handleFilter" />
  
        <!-- Ricerca per nome -->
        <div class="row mb-3">
          <input type="text" class="rounded col-10 mb-3" v-model="searchQuery" placeholder="Cerca per nome del ristorante..." @input="searchCharacters">
        </div>
      </section>
  
      <!-- Lista di SingleCard da stampare -->
      <div class="lista row justify-content-center"> 
        <!-- Iterazione su tutte le SingleCard filtrate -->
        <SingleCard v-for="restaurant in filteredItems" v-show="elementToShow(restaurant.categories)" :key="restaurant.id"
          :name="restaurant.name" :vat="restaurant.vat"
          :category="restaurant.categories.name"
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
          if (this.categoriesToFilter === 'all') {
            return true; // Mostra tutti se la categoria selezionata è 'all'
          } else {
            return categories.some(category => category.name === this.categoriesToFilter);
          }
        },
    
        // Gestisce il filtro delle categorie
        handleFilter(selectedCategories) {
          if (selectedCategories.length === 0) {
            // Se nessuna categoria è selezionata, mostra tutti i ristoranti
            this.filteredItems = this.restaurants;
          } else {
            // Altrimenti, filtra gli elementi in base alle categorie selezionate
            this.filteredItems = this.restaurants.filter(restaurant =>
              restaurant.categories.some(category => selectedCategories.includes(category.name))
            );
          }
        },
    
        // Gestisce la ricerca per nome
        searchCharacters() {
          // Filtra gli elementi in base alla query di ricerca
          this.filteredItems = this.restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
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
    
  <style lang="scss" scoped>
  </style>
  