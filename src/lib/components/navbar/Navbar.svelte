<script lang="ts">
    import { ChevronLeft } from "lucide-svelte";

</script>

<nav class="w-full fixed top-0 left-0 right-0 
    h-20 flex justify-between items-center bg-zinc-800"
    >
    <a href="/" class="ml-5 text-2xl text-white flex items-center"><ChevronLeft /> Back to Order</a>

    <a href="/cart" class="hover:cursor-pointer p-2 rounded-xl">
        <slot />
    </a>
</nav>