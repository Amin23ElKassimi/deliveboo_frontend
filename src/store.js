import { reactive } from "vue";

export const store = reactive({
    loadind: true,
    totale: 0,
    currentRestaurant: null,
    carrello: [] // Dichiarazione del carrello come array vuoto nella store
});