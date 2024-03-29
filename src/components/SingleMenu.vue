<template lang="">
    <div class="alert alert-danger d-flex justify-content-between" role="alert" v-if="showAlert && !alertClosed">
            <p>Il tuo carrello contine elementi di un altro risorante! Concludi l'ordine o elimina gli elementi all'interno per continuare </p>
            <button type="button" class="btn-close" aria-label="Close" @click="closeAlert"></button>
        </div>
    <!-- Info ristorante -->
    <div class="restaurant-info pt-5">
        <div class="pb-2">
                         <!-- Verifica se l'URL è un link HTTP o un percorso locale -->
            <img class="restaurant-img rounded-circle shadow" :src="getImageUrl(image_url)" alt="Restaurant image">
            <!-- <img class="restaurant-img rounded-circle shadow" :src="image_url" > -->
        </div>
        
        <div class="restaurant-details">
            <h5 class="restaurant-name pt-5">{{ name }}</h5>
            <div v-for="(category, index) in categories" :key="index">
                <span class="badge bg-primary">{{ category.name }}</span>
            </div>
            <h6 class="restaurant-address text-muted">{{ address }}</h6>
            <p class="restaurant-phone">{{ phone_number }}</p>
            <div class="restaurant-link" v-if="linkRoute">
                <router-link :to="linkRoute" class="btn btn-primary">
                    {{ linkLabel }}
                </router-link>
            </div>
        </div>
    </div>

<!-- Lista Piatto da stampare come Cards -->
<div class="card col-md-4 mb-4 mx-2" v-for="fooditem in menu" :key="fooditem.id">
    <!-- Utilizza la funzione getImageUrl per gestire l'URL dell'immagine del cibo -->
    <img :src="getImageUrl(fooditem.image_url)" class="card-img-top" alt="...">
    <div class="card-body px-3">
        <h5 class="card-title">{{ fooditem.name }}</h5>
        <p class="card-text">{{ fooditem.description }}</p>
        <p class="card-text">{{ fooditem.price }} €</p>
        <button class="btn btn-success" @click="aggiungiAlCarrelloEMandaEvento(fooditem, id)">Aggiungi al
            carrello</button>
    </div>
</div>




</template>
<script>
import { store } from '@/store';
export default {
    data() {
        return {
            store,
            carrello: JSON.parse(localStorage.getItem('carrello')) || [], // Carica il carrello dall'localStorage
            showAlert: false, // Inizialmente nascondi l'alert
            alertClosed: false // Inizialmente l'alert non è stato chiuso
        }
    },
    props: {
        name: {
            required: true,
            type: String,
        },
        id: {
            required: true,
            type: String,
        },
        vat: {
            required: true,
            type: Number,
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
            type: [Object, String]
        },
        linkLabel: {
            required: false,
            type: String,
        },
        fullLength: {
            required: false,
            type: Boolean,
        },
        category: {
            required: false,
            type: Boolean,
        },
    },
    methods: {
        aggiungiAlCarrello(pietanza) {
            this.carrello.push(pietanza);
            this.salvaCarrello(); // Salva il carrello dopo aver aggiunto un articolo
            /* this.caricaCarrello(); */ // Carica il carrello aggiornato
        },
        salvaCarrello() {
            // Converti l'array del carrello in una stringa JSON e salvalo nel localStorage
            localStorage.setItem('carrello', JSON.stringify(this.carrello));
        },
        caricaCarrello() {
            // Carica il carrello dal localStorage e convertilo da stringa JSON a array di oggetti
            const carrello = localStorage.getItem('carrello');
            if (carrello) {
                this.carrello = JSON.parse(carrello);
            }
        },
        aggiungiAlCarrelloEMandaEvento(pietanza, id) {
            console.log(`lunghezza carrello: ${this.carrello.length}`)
            if (this.store.currentRestaurant == null) {
                this.store.currentRestaurant = id
            }

            if (id != this.store.currentRestaurant) {
                if (!this.showAlert || this.alertClosed) {
                    this.showAlert = true;
                    this.alertClosed = false;
                }
                return;
            }

            const carrelloLocalStorage = JSON.parse(localStorage.getItem('carrello'));
            this.carrello = carrelloLocalStorage || [];
            this.carrello.push(pietanza);
            localStorage.setItem('carrello', JSON.stringify(this.carrello));
            this.$emit('carrelloAggiornato', this.carrello);
        },
        closeAlert() {
            this.alertClosed = true;
        },
        getImageUrl(url) {
            // Verifica se l'URL è un link HTTP o un percorso locale
            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                // Se è un link HTTP o HTTPS, usa direttamente l'URL fornito
                return url;
            } else {
                // Altrimenti, costruisci l'URL completo per le immagini nei percorsi locali
                return 'http://127.0.0.1:8000/storage/' + url;
            }
        }

    },
    mounted() {
        console.log('inserito titolo'),
            console.log(`carrello in mounted ${this.carrello}`);
        this.caricaCarrello();

    },
    updated() {
        console.log(`carrello in updated ${this.carrello}`);
        this.caricaCarrello();
    }
}
</script>

<style lang="scss" scoped>
.restaurant-info {
    display: flex;
    margin-bottom: 20px;
}

.restaurant-img {
    flex: 0 0 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
}

.restaurant-details {
    flex-grow: 1;
}

.restaurant-name {
    font-size: 1.25rem;
    margin-bottom: 5px;
}

.restaurant-address {
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.restaurant-phone {
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.restaurant-link {
    margin-top: auto;
}

@media (max-width: 768px) {
    .restaurant-info {
        flex-direction: column;
    }

    .restaurant-img {
        margin-right: 0;
        margin-bottom: 10px;
        width: 100%;
        height: auto;
    }
}

img {
    height: 400px;
    object-fit: cover;
    margin-bottom: 3rem;
}

img.image-preview {
    height: 200px;
}

.card {
    margin-bottom: 1.5rem;
    width: calc(33.333% - 1rem);
    /* Imposta la larghezza per avere tre cards per riga */
}

.card-img-top {
    height: 200px;
    /* Altezza delle immagini delle cards */
    object-fit: cover;
}

.card-title {
    font-size: 1.25rem;
    /* Dimensione del titolo */
}

.card-text {
    font-size: 1rem;
    /* Dimensione del testo */
}

.card-body {
    padding: 1rem;
    /* Padding del corpo delle cards */
}

.card-deck {
    display: flex;
    flex-wrap: wrap;
    /* Per le righe da tre cards */
    justify-content: space-between;
    /* Spaziatura laterale tra le cards */
}

@media (max-width: 768px) {
    .card {
        width: calc(50% - 1rem);
        /* Imposta due cards per riga su dispositivi più piccoli */
    }
}
</style>