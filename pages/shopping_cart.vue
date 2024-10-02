<script setup>
definePageMeta({
    layout: 'berlnw'
});

const leads = ref(null);
const shopping_cart = ref([]); // Initialize as an empty array

// Fetch leads data from the API
const getLeads = async () => {
  try {
    const response = await $fetch('/api/leads');
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch leads',
    };
  }
};

// Add phone number to shopping cart in sessionStorage
const addToCart = (phoneNumber) => {
  const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];

  if (!shoppingCart.some(item => item.phone_number === phoneNumber.phone_number)) {
    shoppingCart.push(phoneNumber);
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

    // Update reactive shopping_cart variable to trigger reactivity
    shopping_cart.value = shoppingCart;
    console.log('Phone number added to cart:', phoneNumber);
  } else {
    console.log('Phone number is already in the cart');
  }
};

// Remove phone number from shopping cart in sessionStorage
const deleteFromCart = (phoneNumber) => {
  let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];

  // Remove the selected phone number from the shopping cart
  shoppingCart = shoppingCart.filter(item => item.phone_number !== phoneNumber.phone_number);

  // Update sessionStorage and the reactive shopping_cart variable
  sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  shopping_cart.value = shoppingCart;  // Update reactive variable

  console.log('Phone number removed from cart:', phoneNumber);
};

// Load the shopping cart from sessionStorage when the component is mounted
onMounted(async () => {
  const storedCart = sessionStorage.getItem('shoppingCart');
  if (!storedCart) {
    sessionStorage.setItem('shoppingCart', JSON.stringify([]));
  } else {
    shopping_cart.value = JSON.parse(storedCart); // Set reactive value from sessionStorage
    console.log('Loaded shopping cart:', shopping_cart.value);
  }

  // Fetch leads and set the reactive `leads` variable
  leads.value = await getLeads();
});
</script>


<template>
    
    <div class="d-flex vh-100 align-items-center justify-content-center flex-column ">

        <MainMenu />

        <div class="bg-white position-absolute m-3" style="width:200px;height:200px;top:0;right:0">
          <h5>Shopping Cart</h5>
          <ul class="text-888 list-unstyled">
                <li v-for="(xx,i) in shopping_cart" :key="i">{{i+1}}. {{ xx.phone_number }}
                  <button @click="deleteFromCart(xx)">X</button>

                  
                </li>
            </ul>
       
        </div>

        <div class="input_container border rounded-2 p-2 text-center bg-111" style="border-color:#444 !important;">

         <span class="text-ddd">  เลือกเบอร์ที่ต้องการ </span><br/><br/>
         
       
         <ul class="text-888 list-unstyled">
                <li v-for="(lead,i) in leads" :key="i">{{i+1}}. {{ lead.phone_number }} [{{ lead.search_count }}]
                  <button @click="addToCart(lead)">Add</button>
                </li>
            </ul>
            
           

        </div>
    </div>
</template>

<style scoped>
.input_container {
    width: 600px;
    min-height: 300px;
    background: #fff;
}

input {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    background: #333;
    border: 1px solid #666;
    border-radius: 5px;
}

input:focus {
    background: orange;
    outline: none;
    color: black !important;
}

input:focus::placeholder {
    color: orange !important;
}

input::placeholder {
    color: #222
}

</style>
