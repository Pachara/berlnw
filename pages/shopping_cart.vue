<script setup>
definePageMeta({
    layout: 'berlnw'
});


const leads = ref(null);
const shopping_cart = ref([]);
const fortunes = ref([]); // Store fortune results here

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
    shopping_cart.value = shoppingCart; // Update reactive value

    const storedCart = sessionStorage.getItem('shoppingCart');
  } else {
    console.log('Phone number is already in the cart');
  }
};

// Remove phone number from shopping cart in sessionStorage
const deleteFromCart = (phoneNumber) => {
  let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];

  // Remove the selected phone number
  shoppingCart = shoppingCart.filter(item => item.phone_number !== phoneNumber.phone_number);

  sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  shopping_cart.value = shoppingCart; // Update reactive value
};





// Load the shopping cart from sessionStorage and fetch leads on component mount
onMounted(async () => {
  const storedCart = sessionStorage.getItem('shoppingCart');
  if (!storedCart) {
    sessionStorage.setItem('shoppingCart', JSON.stringify([]));
  } else {
    shopping_cart.value = JSON.parse(storedCart); // Set reactive value from sessionStorage
    console.log('Loaded shopping cart:', shopping_cart.value);
  }
  
  leads.value = await getLeads();
  await fetchFortunes();
});

// Load the shopping cart from sessionStorage when the component is mounted






// Compute the lucky number sum for a given phone number
const luckyNumberSum = (phone_number) => {
  if (!phone_number) return 0;
  return phone_number
    .split('')
    .filter(char => !isNaN(char))
    .map(Number)
    .reduce((sum, num) => sum + num, 0);
};

// Fetch fortunes for each lead and store them in fortunes array
const fetchFortunes = async () => {
  for (const lead of leads.value) {
    const fortune = await _useGetFortune(lead.phone_number); // Fetch fortune for each lead
    fortunes.value.push({ phone_number: lead.phone_number, fortune }); // Store fortune result
  }
};

// Get fortune result for a specific phone number
const getFortuneForPhone = (phone_number) => {
  const fortuneEntry = fortunes.value.find(f => f.phone_number === phone_number);
  return fortuneEntry ? fortuneEntry.fortune : 'Loading...'; // Display 'Loading...' until the fortune is fetched
};



const shoppingCartNumber = useState('shoppingCartNumber', () => 0);

watch(shopping_cart, async (newVal) => {

  shoppingCartNumber.value =  shopping_cart.value.length

});

</script>


<template>
  <div >

    <div class="bg-white position-absolute m-3 p-2 d-none" style="width:200px;height:200px;top:5px;right:0">
      <h5 class="text-center fw-bold">Shopping Cart</h5>
      <ul class="text-888 list-unstyled">
        <li v-for="(xx,i) in shopping_cart" :key="i">{{i+1}}. {{ xx.phone_number }}
          <button @click="deleteFromCart(xx)">X</button>
        </li>
      </ul>
    </div>

    <div class="input_container border rounded-2 p-2 text-center bg-111" style="border-color:#444 !important;">
      <h4 class="text-ddd my-2 mb-3">เลือกเบอร์ที่ต้องการ</h4>

      <ul class="text-888 list-unstyled px-3 m-auto mt-0" style="width:500px">
        <li v-for="(lead,i) in leads" :key="i" class="ber_list d-flex bg-222 mb-1 align-items-center justify-content-between px-2" style="height:40px;">
          <div class="d-flex align-items-center">
            <div class="text-center " style="width:30px;">
              {{i+1}}.
            </div>
            <div class="me-2 bg-444 p-1 py-0 rounded">
              {{ luckyNumberSum(lead.phone_number) }}
            </div>
            <div>
              {{ lead.phone_number }}
            </div>
            <div class="mx-2">
              [{{ lead.search_count }}] 
            </div>
           
          </div>
          <div>
            {{ getFortuneForPhone(lead.phone_number).category }} <!-- Display the fetched fortune -->
          </div>
          <button class="ms-2 btn bg-555 p-1 px-2 add_to_cart" @click="addToCart(lead)">Add</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.input_container {
    width: 600px;
    height:auto !important;
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

.add_to_cart:hover{
  background:orange !important;
  color:black !important
}

li.ber_list:hover{
  background:#333 !important;
  cursor: pointer;
}

</style>
