<template lang="">
    <main class="container-fluid">
        <section class="container">
            <div class="row mb-3">
                <input type="text" class="rounded col-10 mb-3" v-model="searchQuery" placeholder="Cerca per nome del ristorante..." @input="searchCharacters">
                
                <select v-model="categoriesToFilter" @change="archetypeToFilter" name="selectCategory" id="selected-card" class="form-select" aria-label="Default select example">
                    <option value="all">Tutti</option>
                    <option v-for="category in categories" :value="category.name">{{ category.name }}</option>
                </select>
            </div>
        </section>
                <!-- Lista Ristoranti da stampare come Cards -->
        <div class="lista row justify-content-center"> 
            <SingleCard  v-for="restaurant in filteredRestaurants" v-show="elementToShow(restaurant.categories)" :key="restaurant.id"
                :name="restaurant.name" :vat="restaurant.vat"
                :category="restaurant.categories.name"
                :address="restaurant.address"  :email="restaurant.email"
                :image_url="restaurant.image_url" :phone_number="restaurant.phone_number"
                :linkRoute="{ name: 'single-restaurant', params: { id: restaurant.id}}" linkLabel="Menu"  />            
        </div>  
    </main>
</template>


<script>
// Import Azion
import SingleCard from '@/components/SingleCard.vue';
import SingleRestaurant from './SingleRestaurant.vue';


import axios from 'axios';

export default {
    name: 'RestaurantList',

    data(){
        return{
            searchQuery: '',
            restaurants: [],
            categories: [],
            categoriesToFilter: 'all',
        }
    },

    computed: {
        filteredRestaurants() {
            if (!this.searchQuery) return this.restaurants;
            console.log(this.restaurants);
                return this.restaurants.filter(restaurant =>
                    restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
        }
    },

    methods:{
        getRestaurants(){
            axios.get('http://127.0.0.1:8000/api/restaurants', {
                params: {
                }
            })
            .then((response) => {
                console.log('ristoranti', response.data.results.data);
                this.restaurants = response.data.results.data;

            })
            .catch(function (error) {
                console.warn(error);
            })
        },
        getCategories(){
            axios.get('http://127.0.0.1:8000/api/categories', {
                params: {
                }
            })
            .then((response) => {
                console.log('categorie', response.data.results);
                this.categories = response.data.results.data;

            })
            .catch(function (error) {
                console.warn(error);
            })
        },
        elementToShow(categories) {
            if (this.categoriesToFilter == 'all') {
                return true;
            } else {
                return categories.some(category => category.name === this.categoriesToFilter);
            }
        },
        searchCharacters() {
                // La ricerca avviene automaticamente grazie alla computed property filteredCharacters
            
        },
    },
    components:{
        SingleCard,
        SingleRestaurant
    },
    created(){
        this.getRestaurants();
        this.getCategories();
    }
}
</script>


<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;

img{
    width: 100%;
}

main {
        background-color: $primary-bg;
        padding: 50px;
    }

    .lista{
        display: flex;
        flex-wrap: wrap;
    }

    .cards{
        color: white;
        width: calc(100% / 5 - 1rem);
        padding: .5rem;
        margin-left: .5rem;
        margin-right: .5rem;
        margin-bottom: 1rem;
        background-color: $primary-bg;
        background-color: #521c76;
        text-align: center;
    }

    .title{
        color: yellow;
    }

    .form-select{
        width: 75%;
    }
    </style>