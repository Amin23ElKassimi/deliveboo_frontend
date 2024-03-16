<template lang="">
    <main class="container-fluid">
        <!-- Lista piatti da stampare come Cards -->
        <div class="lista row justify-content-center"> 
            <div class="card cards col-6 col-md-4 col-lg-3" v-for="fooditem in fooditems" :key="fooditem.id">
                <img :src="fooditem.image_url" class="card-img-top" alt="Food Image">
                <div class="card-body">
                    <h5 class="card-title">{{ fooditem.name }}</h5>
                    <p class="card-text">{{ fooditem.description }}</p>   
                </div>
             </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FoodItemList',

    data() {
        return {
            fooditems: [],
        }
    },

    methods: {
        getFoodItems() {
            axios.get('http://127.0.0.1:8000/api/foodItems')
                .then((response) => {
                    this.fooditems = response.data.results;
                })
                .catch(function (error) {
                    console.warn(error);
                })
        },
    },

    created() {
        this.getFoodItems();
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

main {
    background-color: #f8f9fa;
    /* Colore sfondo principale */
    padding: 20px;
    /* Spaziatura interna */
}

.lista {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    /* Spaziatura tra le cards */
    justify-content: center;
    /* Centra le cards */
}

.cards {
    border-radius: 20px;
    overflow: hidden;
    /* Nasconde eventuali overflow dei contenuti */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* Effetto ombra */
    transition: transform 0.3s ease-in-out;
    /* Transizione al passaggio del mouse */
}

.cards:hover {
    transform: translateY(-5px);
    /* Effetto al passaggio del mouse */
}

.card-body {
    padding: 20px;
}

.card-title {
    font-size: 1.25rem;
    /* Dimensione titolo */
    margin-bottom: 10px;
    /* Spaziatura dal testo */
}

.card-text {
    font-size: 1rem;
    /* Dimensione testo */
    color: #6c757d;
    /* Colore testo */
}

@media (min-width: 576px) {
    .cards {
        width: calc(50% - 20px);
        /* Imposta larghezza per 2 cards per riga */
    }
}

@media (min-width: 768px) {
    .cards {
        width: calc(33.33% - 20px);
        /* Imposta larghezza per 3 cards per riga */
    }
}

@media (min-width: 992px) {
    .cards {
        width: calc(25% - 20px);
        /* Imposta larghezza per 4 cards per riga */
    }
}

@media (min-width: 1200px) {
    .cards {
        width: calc(20% - 20px);
        /* Imposta larghezza per 5 cards per riga */
    }
}
</style>
