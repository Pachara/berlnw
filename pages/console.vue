<script setup>
definePageMeta({
    layout: 'berlnw'
})

// ดูค่า Cookie ก่อนว่ามีหรือไม่

// ถ้ามีก็แสดงว่า Authenticated

// ถ้าไม่มีก็แสดงว่า UnAuthenticated

// PreFlight Check
// CSRF
// CORS



const authCookie = useCookie('authCookie', { maxAge: 86400 });
const isAuthenticated = ref(false);
const correctPassword = "12345";
const password = ref(null)


const authenticated = (inputPassword) => {
  if (inputPassword === correctPassword) {
    isAuthenticated.value = true;
    authCookie.value = true;
  } else {
    alert('Incorrect password. Please try again.');
  }
};

const history = useState('history');

const getLeads = async () => {
  try {
    // Use Nuxt's $fetch to make the API call
    const response = await $fetch('/api/leads');

    // Return the fetched data directly (no need for response.ok check as $fetch throws errors automatically)
    return response.data;
  } catch (error) {
    // Catch any error and return a failure response
    console.error('Error fetching leads:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch leads',
    };
  }
};


const leads = ref(null)

const loading = ref(true)

onMounted(async () => {

  localStorage.setItem('localKey', 'localValue');
  const localValue = localStorage.getItem('localKey');
  console.log('Local Value:', localValue);

  // Set a value in session storage
  sessionStorage.setItem('sessionKey', 'sessionValue');

  // Get a value from session storage
  const sessionValue = sessionStorage.getItem('sessionKey');
  console.log('Session Value:', sessionValue);


  if (authCookie.value === true) {
    isAuthenticated.value = true;
  } 

    leads.value = await getLeads()
    console.log(leads.value)

    loading.value = false;

});

watch(password, async (newVal) => {
    // Reset the fortune value if phone number length is less than 10
    if (newVal === correctPassword) {
      await authenticated(newVal)
    }

});


const test = ref(true);

</script>

<template>
    
    <div v-if="!loading" class="d-flex vh-100 align-items-center justify-content-center flex-column">
        <MainMenu  />

        <div class="input_container border rounded-2 p-2 text-center bg-111" style="border-color:#444 !important;">



            <template v-if="isAuthenticated">
            <h1 class="pt-3 fs-3 text-888 fw-bold mb-3">รายการเบอร์ที่เคยค้นหา</h1>
            <ul class="text-888 list-unstyled">
                <li v-for="(lead,i) in leads" :key="i">{{i+1}}. {{ lead.phone_number }} [{{ lead.search_count }}]</li>
            </ul>
            </template>


            <template v-else>
              <div class="bg-222 rounded-2 h-100 d-flex align-items-center justify-content-center">
                <input placeholder="ใส่พาสเวร์ด" v-model="password" type="tel"  class="mb-3 me-2 text-center"
                :class="{ 'text-orange': password }" style="font-size:1.8em;margin-bottom:5px;width:300px;" />
              </div>
            </template>

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
