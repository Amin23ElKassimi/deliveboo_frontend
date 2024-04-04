<template>
    <main>
        <div class="container">
            <form class="row" @submit.prevent="pagamento">
                <div class="col-6 mb-3">
                    <label for="customer" class="form-label">Nome e Cognome</label>
                    <input type="text" class="form-control" id="customer" v-model="customer" name="customer">
                </div>
                <div class="col-6 mb-3">
                    <label for="user_address" class="form-label">Indirizzo</label>
                    <input type="text" class="form-control" id="user_address" v-model="user_address" name="user_address">
                </div>
                <div class="col-6 mb-3">
                    <label for="user_phone_number" class="form-label">Telefono</label>
                    <input type="text" class="form-control" id="user_phone_number" v-model="user_phone_number" name="user_phone_number">
                </div>
                <div class="col-6 mb-3">
                    <label for="user_mail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="user_mail" v-model="user_mail" name="user_mail">
                </div>
                <!-- DROP IN -->
                <div class="col-7">
                    <div id="dropin-container"></div>
                </div>
                <div class="col-5">
                    <h1>Resoconto</h1>
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
                    <button type="submit" id="submit-button" class="btn btn-primary">Paga ora</button>
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
                            <p>Complimenti, il tuo ordine è già in viaggio!</p>
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
    </main>
</template>

<script>
import BraintreeDropin from 'braintree-web-drop-in';
import axios from 'axios';

const braintreeToken = 'rwrht7y7y5crzp9h';

export default {
    name: 'OrderCheckout',
    data() {
        return {
            customer: '',
            user_address: '',
            user_phone_number: '',
            user_mail: '',
            // restaurant_id: '',
            status: true,
            carrello: JSON.parse(localStorage.getItem('carrello')) || []
        }
    },
    methods: {
        calculatePrice() {
            let total = 0;
            this.carrello.forEach(articolo => {
                total += parseFloat(articolo.price);
            });
            return total.toFixed(2);
        },
        pagamento() {
            const orderData = {
                user_address: this.user_address,
                customer: this.customer,
                user_phone_number: this.user_phone_number,
                user_mail: this.user_mail,
                status: this.status,
                total: this.calculatePrice(),
                restaurant_id: this.carrello.length > 0 ? this.carrello[0].restaurant_id : null,
                food_items: this.carrello.map(item => ({
                    food_id: item.id,
                    // quantity: item.quantity,
                })),
            };
            console.log(orderData, 'questo è quello che contiene il carrello', this.carrello);

            axios.post('http://127.0.0.1:8000/api/orders', orderData)
                .then(response => {
                    console.log('Ordine inviato con successo!', response.data, orderData);
                    this.svuotaCarrello();
                    $('#exampleModal').modal('show');
                })
                .catch(error => {
                    console.error('Errore durante l\'invio dell\'ordine:', error.response.data);
                    // Gestisci eventuali errori qui
                });
        },
        svuotaCarrello() {
            localStorage.removeItem('carrello');
        },
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
        }
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