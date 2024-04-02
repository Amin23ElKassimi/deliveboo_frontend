<template>
    <main>
        <div class="container">
            <!-- <div class="col-12 mt-2"> -->
            <form class="row">
                <div class="col-6 mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nome e Cognome</label>
                    <input type="text" class="form-control" id="customer" name="customer">
                </div>
                <div class="col-6 mb-3">
                    <label for="exampleInputEmail1" class="form-label">Indirizzo</label>
                    <input type="text" class="form-control" id="user_address" name="user_address">
                </div>
                <div class="col-6 mb-3">
                    <label for="exampleInputEmail1" class="form-label">Telefono</label>
                    <input type="text" class="form-control" id="user_phone_number" name="user_phone_number">
                </div>
                <div class="col-6 mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="user_mail" name="user_mail">
                </div>
                <!-- DROP IN -->
                <div class="col-7">
                    <div id="dropin-container">

                    </div>
                </div>
                <div class="col-5">
                    <h1>
                        Resoconto
                    </h1>
                    <ul class="list-group" v-for="food_item in carrello" :key="food_item.id">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            {{ food_item.name }}
                            <span class="badge text-bg-primary rounded-pill">{{ food_item.price }} €</span>
                        </li>
                    </ul>
                </div>
                <div class="mb-3">
                    <h4>Totale: {{ calculatePrice() }} €</h4>
                </div>
                <div>
                    <button type="submit" id="submit-button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent="pagamento">Paga
                        ora</button>
                </div>
            </form>
            <!-- Modale -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ordine Inviato</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Il tuo ordine è già in viaggio!</p>
                            <!-- Immagine dello scooter animata -->
                            <img src="../../public/IMG/giphy.gif" alt="Scooter" id="scooter-image">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </main>
</template>

<script>
import { store } from '@/store';
import BraintreeDropin from 'braintree-web-drop-in';
import axios from 'axios';
import RestaurantList from './RestaurantList.vue';

const braintreeToken = 'rwrht7y7y5crzp9h';

export default {
    name: 'OrderCheckout',
    // props: {
    //     carrello: {
    //         type: Array,
    //         required: true,
    //     },
    // },
    data() {
        return {
            store,
            totaleCarrello: '',
            braintreeInstance: null,
            carrello: JSON.parse(localStorage.getItem('carrello')) || [], // Carica il carrello dall'localStorage

        }
    },
    methods: {
        svuotaCarrello() {
            localStorage.removeItem('carrello');
        },
        pagamento() {
            console.log('PAGAAAHHHHHH')
            this.svuotaCarrello();
            this.$router.push('/restaurants');
        },
        // Brain tree create
        initBraintree() {
            BraintreeDropin.create({
                authorization: braintreeToken,
                container: '#dropin-container',
            }, (err, instance) => {
                if (err) {
                    console.error('Errore durante l\'inizializzazione di Braintree:', err);
                    return;
                }
                this.braintreeInstance = instance;
            });
        },
        calculatePrice() {
            let total = 0;
            this.carrello.forEach(articolo => {
                total += parseFloat(articolo.price);
            });
            return total;
        }

        // this.store.currentRestaurant = null;
    },

    mounted() {
        this.initBraintree();
        let button = document.querySelector('#submit-button');
        braintree.dropin.create({
            authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
            selector: '#dropin-container',

        }, function (err, instance) {
            button.addEventListener('click', function () {
                instance.requestPaymentMethod(function (err, payload) {
                    // Submit payload.nonce to your server
                    if (err == null) {
                        axios.post(`http://127.0.0.1:8000/api/orders/make/payment`, JSON.parse(localStorage.getItem('fullOrder')))
                            .then((response) => {
                                // handle success
                                console.log(response.config.data);
                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                            })
                            .finally(function () {
                                // always executed
                            });
                        router.push({ name: 'restaurants' });
                    }
                });
            })
        });
    }
}
</script>
<style lang="scss" scoped>
#dropin-container {
    width: 100%;
}

#scooter-image {
    width: 100%;
}
</style>