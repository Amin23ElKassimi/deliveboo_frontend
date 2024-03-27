<template>
    <header class="mb-4 shadow-lg">
        <nav class="navbar navbar-graphic navbar-expand-lg " data-bs-theme="dark">
            <div class="container d-flex justify-content-between">
                <div class="d-flex align-items-center">
                    <router-link to="/">
                        <img class="logo-img rounded-circle" src="/Logo_Deliveboo.jpg" alt="immagine logo">
                        <a class="ms-2 navbar-brand" >DeliveBoo</a>
                    </router-link>
                    
                    <ul class="navbar-nav">
                        <li class="nav-item me-2" v-for="(link, index) in linkItems" :key="index">
                            <router-link :to="{ name: link.routeName }" class="nav-link">
                                {{ link.label }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <a class="nav-link text-decoration-none" href="http://127.0.0.1:8000/login" >Area Ristoratore</a>
            </div>
        </nav>

        
        
    </header>
</template>

<script>
import axios from 'axios';

export default {
    name:'AppHeader',
    data() {
        return {
            linkItems: [
                {
                    label: 'Ristoranti',
                    routeName: 'restaurants'
                },
                {
                    label: 'Piatti',
                    routeName: 'fooditems'
                }
            ]
        }
    }, 
}
</script>

<style lang="scss" scoped>
    .nav-link{
        color: white;
    }

    .nav-link:hover{
        color: rgb(91, 145, 245);
    }

    .logo-img{
        width: 30px;
        height: 30px;

    }

    a.navbar-brand{
        text-decoration: none;
    }

    @media only screen and (max-width: 991.2px) {
        
        .nav-link{
          display: flex;
        }
    }
</style>