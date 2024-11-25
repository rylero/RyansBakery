import { writable } from 'svelte/store';

export type Cart = Array<{ id: number, quantity: number }>;


function createCartStore() {
    const { set, update, subscribe } = writable<Cart>([]);
  
    function addToCart(id: number, quantity: number=1) {
        console.log(id, quantity);
        update((cart) => {
            let index = cart.findIndex((val) => val.id == id);
            if (index == -1) {
                cart.push({ id: id, quantity })
            } else {
                cart[index].quantity += quantity;
            }
            return cart
        })
    }
  
    return {
      subscribe,
      set,
      update,
      addToCart,
    };
}
  
export const cartStore = createCartStore();

const currentCart = globalThis.localStorage?.getItem("cart");
let initial = [];
if (currentCart) {
    initial = JSON.parse(currentCart);
}
cartStore.set(initial);
cartStore.subscribe((value) => globalThis.localStorage?.setItem("cart", JSON.stringify(value)))