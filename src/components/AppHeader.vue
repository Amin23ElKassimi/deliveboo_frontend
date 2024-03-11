<template lang="">
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand" href="http://localhost:5174/">DeliveBoo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <!-- <li class="nav-item" v-for="(link, index) in linkItems" :key="index">
                            <router-link :to="{ name: link.routeName }" class="nav-link">
                                {{ link.label }}
                            </router-link>
                        </li> -->
                    </ul>
                </div>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-warning" type="submit">Ricerca</button>
                </form>
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
                    label: 'Restaurants',
                    routeName: 'restaurants'
                },
                {
                    label: 'Categories',
                    routeName: 'categories'
                }
            ]
        }
    },    
}
</script>

<style lang="">

</style>