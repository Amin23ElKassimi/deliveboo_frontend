<template lang="">
    <div id="cards" class="card style">
        <img class="card-img-top" :src="image_url" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <div v-for="(categor, index) in category" :key="index">
                <h6 class="card-subtitle mb-2 text-muted">{{ categor.name }}</h6>
            </div>
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
    <div class="mb-3" v-for="fooditem in menu">
        <img :src="fooditem.image_url" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ fooditem.name }}</h5>
            <p class="card-text">{{ fooditem.description }}</p>
            <p class="card-text">{{ fooditem.price }} €</p>
            <!-- <button class="btn btn-primary" @click="aggiungiAlCarrello(fooditem)">Acquista</button>     -->
            <button class="btn btn-primary" @click="aggiungiAlCarrelloEMandaEvento(fooditem)">Acquista</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                carrello: JSON.parse(localStorage.getItem('carrello')) || [] // Carica il carrello dall'localStorage
            }
        },
        props: {
            name: {
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
                type: Number,
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
            aggiungiAlCarrelloEMandaEvento(pietanza) {
                const carrelloLocalStorage = JSON.parse(localStorage.getItem('carrello'));
                this.carrello = carrelloLocalStorage || [];
                this.carrello.push(pietanza);
                localStorage.setItem('carrello', JSON.stringify(this.carrello));
                this.$emit('carrelloAggiornato', this.carrello);
            },
        },
        mounted() {
            console.log('inserito titolo'),
                console.log(`carrello in mounted ${this.carrello}`);
            this.caricaCarrello();

        },
        updated() {
            console.log(`carrello in updated ${this.carrello}`);
            this.caricaCarrello(); // Carica il carrello anche quando il componente viene aggiornato
        }
    }
</script>

<style lang="scss" scoped>

    img.image-preview {
        height: 200px;
    }

    #cards {
        width: 18rem;
        margin: 1rem;
    }

    .card-img-top{
        width: 100%;
        height: 250px;
        margin-bottom: 1rem;
    }
</style>