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
                        <div class="mb-3">
                            <h4>Totale: {{ store.totale }} €</h4>
                        </div>
                        <button type="submit" class="btn btn-primary" @click="pagamento()">Vai al pagamento</button>
                    </form>
                </div>
            </div>
        </div>
        
    </main>
</template>

<script>
import { store } from '@/store';
export default {
    

    data() {
        return {
            store,
            totaleCarrello : '',
        }
    },

    methods: {
        svuotaCarrello() {
            localStorage.removeItem('carrello');
        },
        pagamento(){
            console.log('PAGAAAHHHHHH')
            this.svuotaCarrello();
            this.$router.push('/restaurants');
            this.store.currentRestaurant = null;
        }
    },

    created() {
    }
}
</script>

<style lang="scss" scoped>
    
</style>