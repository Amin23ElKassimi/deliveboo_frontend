<template lang="">
    <main class="container">
        <section class="container">
            <!-- Lista Film da stampare come Cards -->
            <div class="lista row justify-content-center"> 
                <SingleCard class="card p-0 col-3 mx-4 my-5" v-for="restaurant in restaurants" :key="restaurant.id" :name="restaurant.name" :vat="restaurant.vat" :address="restaurant.address"  :email="restaurant.email" :image_url="restaurant.image_url" :phone_number="restaurant.phone_number"/>            
            </div>
        </section>
    </main>
</template>


<script>
// Import Azion
import SingleCard from '@/components/SingleCard.vue';

import axios from 'axios';

export default {
    name: 'RestaurantList',

    data(){
        return{
            restaurant: [],
            id: ''
        }
    },

    methods:{
        // getRestaurants(){
        //     axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`, {
        //         params: {
        //         }
        //     })
        //     .then((response) => {
        //         console.log('ristoranti', response.data.results1.data);
        //         this.restaurants = response.data.results1.data;

        //     })
        //     .catch(function (error) {
        //         console.warn(error);
        //     })
        // },
    },
    components:{
        SingleCard
    },
    created(){
        // this.getRestaurants();
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
    </style>