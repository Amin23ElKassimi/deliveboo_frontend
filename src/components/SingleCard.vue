<template lang="">
    <div>
        <div class="card-body">
            <h1 class="card-title mb-3">
                {{ title }}
            </h1>


            <img v-if="image" :src="image" class="card-img-top mb-3" :class="fullLength ? '' : 'image-preview'" alt="...">

            <p class="card-text" v-if="fullLength">
                {{ content }}
            </p>
            <p v-else>
                {{ content.substring(0, 120) }}...
            </p>


            <div class="w-100 d-flex mb-3" v-if="linkRoute">
                <router-link :to="linkRoute" class="btn btn-primary">
                    {{ linkLabel }}
                </router-link>
            </div>
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
        title: {
            required: true,
            type: String,
        },
        content: {
            required: true,
            type: String,
        },
        image: {
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
</style>