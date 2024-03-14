<template lang="">
    <div id="cards" class="card style" >
        <img class="card-img-top" :src="image_url" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Nome Risto{{ name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ category }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">{{ address }}</h6>
        <p class="card-text">{{ phone_number }}</p>
        <div class="w-100 d-flex mb-3" v-if="linkRoute">
            <router-link :to="linkRoute" class="btn btn-primary">
                {{ linkLabel }}
            </router-link>
        </div>
        </div>
        
    </div>
    <!-- Lista Film da stampare come Cards -->
    <div v-for="fooditem in menu">
        <img :src="fooditem.image_url" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"  >{{ fooditem.name }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>    
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props:{
        name: {
            required: true,
            type: String,
        },
        vat: {
            required: true,
            type: String,
        },
        address: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        image_url: {
            required: true,
            type: String,
        },
        phone_number: {
            required: true,
            type: String,
        },
        vat: {
            required: true,
            type: String,
        },
        menu: {
            required: true,
            type: String,
        },
        linkRoute: {
            required: false,
            type: [ Object, String ]
        },
        linkLabel: {
            required: false,
            type: String,
        },
        fullLength: {
            required: false,
            type: Boolean,
        },
    }
}
</script>

<style lang="scss" scoped>
    img{
        height: 400px;
        object-fit: cover;
        margin-bottom: 3rem;
    }

    img.image-preview{
        height: 200px;
    }
    #cards{
        width: 18rem;
        margin: 1rem;
    }
    


</style>