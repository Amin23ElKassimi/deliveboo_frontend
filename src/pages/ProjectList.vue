<template lang="">
    <main class="container">
        <!-- Lista Film da stampare come Cards -->
        <div class="lista row justify-content-center"> 
            <SingleCard class="card p-0 col-3 mx-4 my-5" v-for="project in projects" :key="project.id"
        :title="project.name" :image="project.view" :content="project.description" />                                                         
        </div>
    </main>
</template>


<script>
// Import Azion
import SingleCard from '@/components/SingleCard.vue';

import axios from 'axios';

export default {
    name: 'AppMain',

    data(){
        return{
            projects: [],
        }
    },

    methods:{
        getProjects(){
            axios.get('http://127.0.0.1:8000/api/projects', {
                params: {
                }
            })
            .then((response) => {
                console.log(response.data.results.data);
                this.projects = response.data.results.data;

            })
            .catch(function (error) {
                console.warn(error);
            })
        }
    },
    components:{
        SingleCard
    },
    created(){
        this.getProjects();
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