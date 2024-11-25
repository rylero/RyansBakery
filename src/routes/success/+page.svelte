<script lang="ts">
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import { ChevronLeft } from "lucide-svelte";
</script>

<nav class="w-full fixed top-0 left-0 right-0 
    h-20 flex justify-between items-center bg-zinc-800"
    >
    <a href="/" class="ml-5 text-2xl text-white flex items-center"><ChevronLeft /> Back to Homepage</a>

    <a href="/cart" class="hover:cursor-pointer p-2 rounded-xl">
        <slot />
    </a>
</nav>
<div class="w-screen h-screen flex flex-col justify-center items-center gap-2">
    <h1 class="text-4xl">Thanks for your order!</h1>
    <a href="/" class="text-xl flex items-center"><ChevronLeft /> Back to Homepage</a>
</div>