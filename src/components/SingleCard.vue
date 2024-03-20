<template lang="">
    <router-link :to="linkRoute" id="cards" class="card style">
        <div class="">
             <!-- Verifica se l'URL è un link HTTP o un percorso locale -->
            <img id="card-img-top" :src="getImageUrl(image_url)" alt="Card image cap">
            <div class="ps-3 pt-2 pe-3 container-text-card">
                <div class="row text-center mb-2">
                    <h5 class="card-title">{{ name }}</h5>
                </div>
                <div class="box-category w-100 d-flex flex-wrap">
                    <div v-for="(category, index) in category" :key="index">
                        <div class="bg-info rounded ms-1 me-1">
                            <p class="card-subtitle ms-1 me-1 mb-2 text-white text-muted"><small>{{ category.name }}</small></p>
                        </div>
                    </div>
                </div>
                <h6 class="card-subtitle mb-2 text-dark text-muted">{{ address }}</h6>
                <p class="card-text">Tel. {{ phone_number }}</p>
            </div>
        </div>
    </router-link>

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
            carrello: JSON.parse(localStorage.getItem('carrello')) || [], // Carica il carrello dall'localStorage
            isHttpLink(url) {
                return url.split(':')[0] === 'http';
            }
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
        this.caricaCarrello(); // Carica il carrello anche quando il componente viene aggiornato
    }
}
</script>

<style lang="scss" scoped>
img.image-preview {
    height: 200px;
}

#cards {
    width: 14rem;
    height: 500px;
    margin: 1rem;
    padding: 0;
    border-radius: 10px;
    text-decoration: none;
    box-shadow: 1px 1px 5px 2px rgb(136, 177, 177);
}

#cards:hover {
    box-shadow: 5px 5px 5px 3px rgb(136, 177, 177);
    scale: 1.1;
    transition: .2s;
}

#card-img-top {
    width: 100%;
    border-radius: 10px 10px 0 0;
    height: 250px;
    margin-bottom: 1rem;
    box-shadow: 0px 3px 5px lightblue;
}

.container-text-card{
    display: flex;
    height: 210px;
    flex-direction: column;
    justify-content: space-between;
}

@media only screen and (max-width: 549px) {
    #cards {
        width: 13rem;
    }


}
</style>