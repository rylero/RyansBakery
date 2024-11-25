<script lang="ts">
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import { ShoppingBasket } from 'lucide-svelte';

    import Hero from "$lib/components/hero/Hero.svelte";
    import ProductCard from "$lib/components/productCard/ProductCard.svelte";

    import { cartStore } from "../state/cart";
    import { products } from "../state/products";

    let cartSize = $state(0);
    cartStore.subscribe((cart) => {
        cartSize = 0;
        for (var i = 0; i < cart.length; i++) {
            cartSize += cart[i].quantity;
        }
    })
</script>

<a href="/cart" class="fixed top-5 right-5 bg-white p-3.5 rounded-lg hover:cursor-pointer shadow-lg hover:shadow-2xl">
    <ShoppingBasket color="#000" size={38} />
    <span class="absolute bottom-0 right-2">{cartSize}</span>
</a>


<Hero />

{#each products as group}
    <div class="bg-zinc-100 px-6 sm:px-10 md:px-16 pt-4 mx-auto flex flex-col items-center">
        <div class="w-full">
            <h1 class="text-3xl w-full mt-5 pl-5">{group.name}</h1>
            <h1 class="text-xl mt-1 mb-5 w-full pl-5 text-gray-700">{group.description}</h1>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {#each group.products as product}
                    <ProductCard
                        {...product} 
                        addButton={(quantity: number) => {
                            cartStore.addToCart(product.id,quantity)
                        }}
                    />
                {/each}
            </div>
        </div>
    </div>
{/each}

<div class="bg-zinc-100 h-32 w-full"></div>