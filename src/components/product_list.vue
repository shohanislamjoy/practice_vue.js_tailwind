
<script setup>
import { ref } from 'vue';
import products from '@/assets/product.json';

const product_data = ref(products);

  
// Log to the console for debugging
console.log(product_data.value);
</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
      <h2 class="text-3xl font-semibold text-center mb-6">Product List</h2>
      
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Iterate over product_data -->
        <li v-for="(product, index) in product_data" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden">
          
          <!-- Product Image -->
          <img :src="product.image" alt="product.name" class="w-full h-48 object-cover">
          
          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800">{{ product.name }}</h3>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <p class="text-xl font-semibold text-gray-900 mt-4">${{ product.price }}</p>
            
            <!-- Button (optional) -->
            <button class="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  

  
