<template lang="">
<div class="card" style="width: 18rem;">
    <img class="card-img-top" :src="image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ address }}</h6>
      <p class="card-text">{{ phone_number }}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
<!-- <img v-if="image" :src="image" class="card-img-top mb-3" :class="fullLength ? '' : 'image-preview'" alt="...">
<p class="card-text" v-if="fullLength">
    {{ vat }}
</p>
<p v-else>
    {{ content.substring(0, 120) }}...
</p> -->
<!-- <div class="w-100 d-flex mb-3" v-if="linkRoute">
    <router-link :to="linkRoute" class="btn btn-primary">
        {{ linkLabel }}
    </router-link>
</div> -->

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
        // linkRoute: {
        //     required: false,
        //     type: [ Object, String ]
        // },
        // linkLabel: {
        //     required: false,
        //     type: String,
        // },
        // fullLength: {
        //     required: false,
        //     type: Boolean,
        // },
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
</style>