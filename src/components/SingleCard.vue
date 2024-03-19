<template lang="">
    <div class="card flex-row col-10 col-sm-12 align-items-center rounded-pill p-3 mx-3 mb-4 border-0 shadow-lg">
        <div class="rounded-circle overflow-hidden">
            <img class="card-img-top align-self-center" :src="image_url" alt="Card image cap">
        </div>
        <div class="d-flex flex-lg-row flex-sm-column align-items-center justify-content-between flex-grow-1">
            <div class="card-body align-self-center ms-3">
                <h3 class="card-title fw-bold">{{ name }}</h3>
                <span v-for="(categor, index) in category" :key="index">
                    <span class="card-subtitle me-2 text-muted">{{ categor.name }}</span>
                </span>
                    <h6 class="card-subtitle mb-2 text-muted pt-3">{{ address }}</h6>
                    <p class="card-text">{{ phone_number }}</p>
            </div>
            <div class="h-100 d-flex mb-3 align-items-center" v-if="linkRoute">
                    <router-link :to="linkRoute" class="btn btn-secondary rounded-pill me-5 fw-bold fs-5 shadow-lg">
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
    img {
        width: 400px;
        height: 400px;
        object-fit: cover;
        object-position: center;
    }

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