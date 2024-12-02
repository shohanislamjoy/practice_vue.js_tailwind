<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

const newProduct = reactive({
  id: '', // Auto-generated ID
  name: '',
  description: '',
  category: '',
  price: '',
  currency: 'USD',
  images: [],
  features: [''], // Initialize with one empty feature
  stock: '',
  sku: '',
  tags: [],
  release_date: '',
});

// Auto-increment ID logic
const productCounter = ref(0); // Local counter for auto-increment

const fetchCurrentCounter = async () => {
  try {
    // const response = await axios.get('/api/products'); // Fetch existing products
    const response = await axios.get(`https://practice-vue-js-tailwind.onrender.com/products`);
    // Set counter based on the largest ID if available, or default to 1
    const ids = response.data.map(product => parseInt(product.id, 10)).filter(Number.isFinite);
    productCounter.value = ids.length ? Math.max(...ids) + 1 : 1;
  } catch (error) {
    console.error('Error fetching current product counter:', error);
    productCounter.value = 1; // Fallback to 1 if there's an error
  }
};

// Add a new feature field
const addFeature = () => {
  newProduct.features.push(''); // Add an empty string to the features array
};

// Remove a feature field
const removeFeature = (index) => {
  if (newProduct.features.length > 1) {
    newProduct.features.splice(index, 1); // Remove feature at the given index
  } else {
    alert('At least one feature is required.');
  }
};

// Add Product Function
const addProduct = async () => {
  try {
    // Set the product ID and release_date
    newProduct.id = `${productCounter.value}`; // ID is a string based on the counter
    newProduct.release_date = new Date().toISOString(); // ISO 8601 timestamp

    console.log('New Product:', JSON.stringify(newProduct, null, 2));

    // Post the product
    // await axios.post('/api/products', { ...newProduct }); // Spread to avoid reactivity issues
    const response = await axios.get(`https://practice-vue-js-tailwind.onrender.com/products`, { ...newProduct });
    alert('Product added successfully!');

    // Increment counter and reset form
    productCounter.value++;
    resetForm();
  } catch (error) {
    console.error('Error Adding Product:', error);
    alert('Failed to add product. Please try again.');
  }
};

// Reset form
const resetForm = () => {
  Object.assign(newProduct, {
    id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    currency: 'USD',
    images: [],
    features: [''], // Reset features to one empty feature
    stock: '',
    sku: '',
    tags: [],
    release_date: '',
  });
};

// Fetch the initial counter on component mount
onMounted(fetchCurrentCounter);
</script>


<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Add New Product</h2>
    <form @submit.prevent="addProduct" class="space-y-4">
      <!-- ID (Auto-generated, hidden from user) -->
      <input v-model="newProduct.id" type="hidden" />

      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          id="name"
          v-model="newProduct.name"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="newProduct.description"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product description"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Other Fields -->
      <!-- (No changes, remain as is, like category, price, currency, images, features, etc.) -->
       
      <!-- Category -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="category"
          v-model="newProduct.category"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product category"
        />
      </div>

      <!-- Price -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            v-model="newProduct.price"
            type="number"
            step="0.01"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency"
            v-model="newProduct.currency"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <!-- Images -->
      <div>
        <label for="images" class="block text-sm font-medium text-gray-700">Images (Comma-separated URLs)</label>
        <input
          id="images"
          v-model="newProduct.images"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter image URLs separated by commas"
        />
      </div>

<!-- Features (Dynamic List) -->
<div>
        <label class="block text-sm font-medium text-gray-700">Features</label>
        <div v-for="(feature, index) in newProduct.features" :key="index" class="flex items-center gap-2 mt-2">
          <input
            v-model="newProduct.features[index]"
            type="text"
            class="flex-grow border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter feature"
            required
          />
          <button
            type="button"
            class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            @click="removeFeature(index)"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          @click="addFeature"
        >
          Add Feature
        </button>
      </div>
      <!-- Stock -->
      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          id="stock"
          v-model="newProduct.stock"
          type="number"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter stock quantity"
        />
      </div>

      <!-- SKU -->
      <div>
        <label for="sku" class="block text-sm font-medium text-gray-700">SKU</label>
        <input
          id="sku"
          v-model="newProduct.sku"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter SKU"
        />
      </div>

      <!-- Tags -->
      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700">Tags (Comma-separated)</label>
        <input
          id="tags"
          v-model="newProduct.tags"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter tags separated by commas"
        />
      </div>

      <!-- Release Date -->
      <div>
        <label for="release_date" class="block text-sm font-medium text-gray-700">Release Date</label>
        <input
          id="release_date"
          v-model="newProduct.release_date"
          type="date"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>


      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  </div>
</template>
