<script lang="ts">
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    import {cartStore} from "../../state/cart";
    import {products, type Product} from "../../state/products";
    import { Trash2 } from "lucide-svelte";

    const findProduct = (id: number) : Product | undefined => {
        let product: Product | undefined = undefined;
        products.forEach((v) => {
            product = v.products.find(v2 => v2.id == id);
        })
        return product;
    }

    let cartTotal = "";
    let cart: Array<{quantity: number, product: Product}> = [];
    cartStore.subscribe(cartData => {
        cart = [];
        let cartSum = 0;
        for (var i = 0; i < cartData.length; i++) {
            let product = findProduct(cartData[i].id);
            if (product == undefined) {
                continue
            }
            cart.push({
                quantity: cartData[i].quantity,
                product: product,
            });

            cartSum += cartData[i].quantity * product.price;
        }
        cartTotal = cartSum.toFixed(2);
    })

    const changeItemQuantity = (id: number, v:number) => {
        cartStore.update((cart) => {
            let product = cart.find((v) => v.id == id);
            if (product) {
                product.quantity = v;
            }
            return cart;
        })
    }

    const checkout = async () => {
        const data = await (await fetch("/checkout", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cart: cart
            })
        })).json()
        window.location.replace(data.url);
    }

    const removeItem = (id: number) => {
        cartStore.update((cart) => {
            cart = cart.filter((v) => v.id != id);
            return cart;
        })
    }
</script>

<Navbar />

<div class="h-32"></div>

<div class="w-full min-h-screen flex flex-col lg:flex-row lg:justify-around items-center lg:items-start gap-3">
    <div class="h-full flex flex-col justify-center items-center gap-3 ml-4">
    {#each cart as item}
        <div class="pl-4 pt-4 pb-4 w-[90vw] max-w-[600px] h-36 rounded-xl shadow-lg hover:shadow-2xl hover:cursor-pointer flex flex-row justify-between gap-0.5 overflow-hidden">
            <div class="flex flex-col justify-between w-full pr-3">
                <div>
                    <span class="font-bold mb-1">{item.product.name}</span>
                    <p class="text-gray-600 text-sm">{@html item.product.description}</p>
                </div>
                <div class="flex justify-between items-end">
                    <span>${item.product.price} {item.product.unit}</span>
                    <div class="flex flex-row items-center gap-2">
                        <Button onclick={() => removeItem(item.product.id)} class="px-1.5 shadow-lg3" variant="outline"><Trash2 /></Button>
                        <select on:change={(v) => changeItemQuantity(item.product.id, parseInt(v.currentTarget.value))}  value={item.quantity} class="border rounded-lg shadow-lg px-3 py-2">
                            {#each [1,2,3,4,5,6,7,8,9,10] as number}
                                <option value={number}>{number}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
            <div style="background-image: url({item.product.img});" class="bg-cover bg-center w-44 h-36 -mt-4"></div>
        </div>
    {/each}
    </div>
    <form on:submit|preventDefault={checkout} class="border-2 rounded-lg p-4 w-full max-w-[27rem] mr-4 flex flex-col gap-4">
        <div class="mb-6">
            <h1 class="text-3xl">Cart</h1>
            <h1 class="text-xl">Total: ${cartTotal}</h1>
        </div>
        <Button type="submit">Checkout</Button>
    </form>
</div>