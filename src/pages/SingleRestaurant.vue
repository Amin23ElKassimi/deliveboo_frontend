<template lang="">
    <!-- Filtri -->
    <div>
        <div class="d-flex justify-content-end">
                <button class="z-1 btn btn-primary me-5 mt-4 position-fixed" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <span v-if="carrello.length > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ carrello.length }}
                    <span class="visually-hidden">Food items nel carrello</span>
                    </span>
                </button>

                <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Acquista</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                    <div class="offcanvas-body">
                        <ul  class="list-group">
                        <li v-for="articolo in carrello" class="list-group-item">
                        <div class="d-flex justify-content-between">

                            <p>{{ articolo.name }}</p>
                            <p>{{ articolo.price }} €</p>
                            <button class="btn btn-danger btn-sm" @click="rimuoviDalCarrello(index)">Rimuovi</button>
                        </div>
                        </li>
                        </ul>
                        <p class="fw-bold">Totale: {{ calcolaTotale() }} €</p>
                        <!-- <button class="btn btn-primary" @click="svuotaCarrello()">Vai al checkout</button> -->
                        <button class="btn btn-primary" @click="vaiAlCheckout()">Vai al checkout</button>
                    </div>
                </div>
            </div>
    </div>
    <!-- Ristonranti -->
    <main class="container">
        <section class="row justify-content-center">
            <SingleMenu class="p-0 col-12 mx-4 my-5" @carrelloAggiornato="aggiornaCarrelloPadre"
            :name="restaurant.name" :vat="restaurant.vat"
            :menu="restaurant.food_item"
            :address="restaurant.address"  :email="restaurant.email"
            :image_url="restaurant.image_url" :phone_number="restaurant.phone_number"/>
        </section>
    </main>
</template>

<script>
import SingleMenu from '@/components/SingleMenu.vue';
import { store } from '@/store';
import axios from 'axios';

export default {
    name: 'PostList',
    data() {
        return {
            store,
            restaurants: [],
            restaurant: {},
            id: '',
            carrello: JSON.parse(localStorage.getItem('carrello')) || [], // Carica il carrello dall'localStorage
        }
    },
    methods: {
        getResturant() {
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
        getFoodItems() {
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
            localStorage.setItem('carrello', JSON.stringify(this.carrello));
            this.totale = this.calcolaTotale();
        },
        svuotaCarrello() {
            this.carrello = [];
            localStorage.removeItem('carrello');
            console.log(localStorage)
        },
        calcolaTotale() {
            
            return this.carrello.reduce((totale, articolo) => totale + parseFloat(articolo.price), 0).toFixed(2);
        },
        rimuoviDalCarrello(index) {
            this.carrello.splice(index, 1); // Rimuove l'articolo dal carrello
            localStorage.setItem('carrello', JSON.stringify(this.carrello)); // Aggiorna il carrello nell'localStorage
        },
        vaiAlCheckout() {
            this.store.totale = this.calcolaTotale();
            this.$router.push('/checkout');
        },
    },
    components: {
        SingleMenu,
    },

    props: {
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

    created() {
        console.log(this.menu);
        this.getResturant();
        this.getFoodItems();
    }
}
</script>

<style lang="scss"></style>