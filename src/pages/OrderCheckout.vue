<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-12 mt-2">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nome e Cognome</label>
                            <input type="text" class="form-control" id="customer" name="customer">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Indirizzo</label>
                            <input type="text" class="form-control" id="user_address" name="user_address">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Telefono</label>
                            <input type="text" class="form-control" id="user_phone_number" name="user_phone_number">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" class="form-control" id="user_mail" name="user_mail">
                        </div>
                        <!-- DROP IN -->
                        <div id="dropin-container">
                        </div>
                        <div class="mb-3">
                            <h4>Totale: {{ store.totale }} €</h4>
                        </div>
                        
                        <button type="submit" id="submit-button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent="pagamento">Vai al pagamento</button>
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
            </div>
        </div>
    </main>
</template>

<script>
import { store } from '@/store';
import BraintreeDropin from 'braintree-web-drop-in';
import axios from 'axios';

const braintreeToken = 'rwrht7y7y5crzp9h';

export default {
    data() {
        return {
            store,
            totaleCarrello: '',
            braintreeInstance: null,
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
                    if(err == null){
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
                        router.push({name: 'restaurants'});
                    }
                });
            })
        });
    }
}
</script>
<style lang="scss" scoped>
    #dropin-container{
        width: 800px;
    }
    #scooter-image{
        width: 100%;
    }
</style>