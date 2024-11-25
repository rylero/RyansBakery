<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import Button from "../ui/button/button.svelte";
    import * as Select from "$lib/components/ui/select";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Info } from "lucide-svelte";
    import DialogFooter from "../ui/dialog/dialog-footer.svelte";

    let { id, name, img, description, price, unit, addButton} = $props();

    let selectedQuantity = $state(1);
</script>

<Dialog.Root>
    <Dialog.Trigger>

        <div class="pl-4 pt-4 pb-4 w-full h-36 rounded-xl shadow-lg text-left hover:shadow-2xl hover:cursor-pointer flex flex-row justify-between gap-0.5 overflow-hidden">
            <div class="flex flex-col justify-between w-full pr-3">
                <div>
                    <span class="font-bold mb-1">{name}</span>
                    <p class="text-gray-600 text-sm">{@html description}</p>
                </div>
                <span>${price} {unit}</span>
            </div>
            <div style="background-image: url({img});" class="bg-cover bg-center w-44 h-36 -mt-4"></div>
        </div>
        
    </Dialog.Trigger>
    <Dialog.Content class="ml-4 mr-4 w-96">
        <Dialog.Header class="w-full">
            <Dialog.Title>{name}</Dialog.Title>
            <Dialog.Description>
                {@html description}
            </Dialog.Description>
        </Dialog.Header>

        <div style="background-image: url({img});" class="w-full h-96 bg-cover bg-center"></div>

        <div class="flex flex-row justify-between items-center">
            <span>${price} {unit}</span>
            <div>
                <select bind:value={selectedQuantity} class="border rounded-lg shadow-lg px-3 py-2">
                    {#each [1,2,3,4,5,6,7,8,9,10] as number}
                        <option value={number}>{number}</option>
                    {/each}
                </select>
                <Dialog.Close>
                    <Button onclick={() => addButton(selectedQuantity)} type="submit">Add to Cart</Button>
                </Dialog.Close>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>
