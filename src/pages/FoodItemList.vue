<template lang="">
    <main class="container-fluid">
        <!-- Lista Film da stampare come Cards -->
        <div class="lista row justify-content-center"> 
            <div class="card cards" v-for="fooditem in fooditems" style="width: calc(100% / 4);">
                <img :src="fooditem.image_url" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"  >{{ fooditem.name }}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>    
                </div>
             </div>
        </div>
    </main>
</template>


<script>
import axios from 'axios';

export default {
    name: 'FoodItemList',

    data(){
        return{
            fooditems: [],
        }
    },

    methods:{
        getFoodItems(){
            axios.get('http://127.0.0.1:8000/api/foodItems', {
                params: {
                }
            })
            .then((response) => {
                console.log(response.data.results);
                this.fooditems = response.data.results;
            })
            .catch(function (error) {
                console.warn(error);
            })
        },

    },


    created(){
        this.getFoodItems();
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
        background-color: #1a6b1e;
        text-align: center;
        border-radius: 20px;
    }

    .title{
        color: yellow;
    }
    </style>