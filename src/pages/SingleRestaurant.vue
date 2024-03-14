<template lang="">
    <main class="container">
        
        <section class="row justify-content-center">
            <div class="d-flex justify-content-end">
                <button class="btn btn-warning mt-3 position-fixed" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Carrello</button>

                <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Acquista</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                    <div class="offcanvas-body">
                        <ul  class="list-group">
                        <li v-for="articolo in carrello" class="list-group-item">{{ articolo.name }}</li>
                        </ul>
                        <button class="btn btn-primary" @click="svuotaCarrello()">Invio</button>
                    </div>
                </div>
            </div>

            <SingleCard class="p-0 col-12 mx-4 my-5" @carrelloAggiornato="aggiornaCarrelloPadre"
            :name="restaurant.name" :vat="restaurant.vat"
            :menu="restaurant.food_item"
            :address="restaurant.address"  :email="restaurant.email"
            :image_url="restaurant.image_url" :phone_number="restaurant.phone_number"/>
        </section>
    </main>
</template>

<script>
import SingleCard from '@/components/SingleCard.vue';

import axios from 'axios';

export default {
    name: 'PostList',
    data(){
        return{
            restaurants: [],
            restaurant: {},
            id: '',
            carrello: JSON.parse(localStorage.getItem('carrello')) || [] // Carica il carrello dall'localStorage
        }
    },
    methods:{
        getResturant(){
            axios.get(`http://127.0.0.1:8000/api/restaurants/${this.$route.params.id}`, {
                params: {
                }
            })
            .then((response) => {
                console.log(this.$route.params.id);
                // console.log(response.data.results);
                this.restaurant = response.data.results;

            })
            .catch(function (error) {
                console.warn(error);
             })
        },
        getFoodItems(){
            axios.get('http://127.0.0.1:8000/api/foodItems', {
                params: {
                }
            })
            .then((response) => {
                // console.log(response.data.results);
                this.fooditems = response.data.results;
            })
            .catch(function (error) {
                console.warn(error);
            })
        },
        aggiornaCarrelloPadre(carrelloAggiornato) {
        this.carrello = carrelloAggiornato;
        console.log(this.carrello)
        localStorage.setItem('carrello', JSON.stringify(this.carrello)); // Salva il carrello nel localStorage del padre
        },
        svuotaCarrello() {
            // Svuota il carrello e cancella i dati dal localStorage
            this.carrello = [];
            localStorage.removeItem('carrello');
        }
    },
    components:{
        SingleCard,
    },

    props:{
        name: {
            required: true,
            type: String,
        },
        image_url: {
            required: true,
            type: String,
        },
        menu: {
            required: true,
            type: String,
        },
    },

    created(){
        console.log(this.menu);
        this.getResturant();
        this.getFoodItems();
    }
}
</script>

<style lang="scss">
</style>