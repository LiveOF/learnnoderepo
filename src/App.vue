<script setup>
import { ref } from 'vue';

let message = ref('Hello vue!')
setTimeout(() => {
    message.value = "Hello";
    console.log('Msg changed');
}, 10_000);
</script>
<template>
    <div class="container">
        <div class="content">
            <h1>{{ message }}</h1>
        </div>
    </div>
</template>
<style></style>