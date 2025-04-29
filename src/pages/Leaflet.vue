<script setup>
import { ref } from 'vue';
import LeafletMap from '../components/LeafletMap.vue';
 
let coords = ref([59.42691, 24.74344]); // Initial map center
let zoom = ref(19);
let homeCoords = [59.441424, 24.738884];
let homePolygon = [
  // Updated coordinates to make a smaller polygon just around house #31
  [59.441458, 24.738535], // Top-left corner
  [59.441683, 24.739414], // Top-right corner
  [59.441524, 24.739579], // Bottom-right corner
  [59.441253, 24.738623], // Bottom-left corner
  [59.441458, 24.738535]  // Back to first point to close polygon
];
</script>

<template>
    <button class="button is-primary" @click="coords=homeCoords">Go to my home</button>
    <input type="range" min="1" max="19" step="1" v-model="zoom">
    <LeafletMap 
        :center="coords" 
        :zoom="zoom"
        :marker="homeCoords"
        :polygon="homePolygon"
    ></LeafletMap>
</template>