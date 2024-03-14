<template lang="">
    <main class="container">
        <section class="row justify-content-center">
            <SingleCard class="p-0 col-12 mx-4 my-5" 
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
            id: ''
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