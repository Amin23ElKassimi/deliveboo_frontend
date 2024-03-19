<template lang="">
    <header class="mb-4 shadow-lg">
        <nav class="navbar navbar-graphic navbar-expand-lg " data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand">DeliveBoo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class= "w-60" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item me-2" v-for="(link, index) in linkItems" :key="index">
                            <router-link :to="{ name: link.routeName }" class="nav-link">
                                {{ link.label }}
                            </router-link>
                        </li>
                        <li class="pt-2 ms-2 color-gray">
                            <a class="text-decoration-none" href="http://127.0.0.1:8000/login" >Area Ristoratore</a>
                        </li>
                    </ul>
                </div>
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
                // {
                //     label: 'Home',
                //     routeName: 'home'
                // },
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

</style>