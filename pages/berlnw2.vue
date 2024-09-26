<script setup>
definePageMeta({
  layout: 'berlnw2'
})

const phone_number = ref(null)


// Computed property for phone number validation
const isPhoneNumberValid = computed(() => {
    if(!phone_number.value) return false
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone_number.value);
})


const luckyNumberSum = computed(() => {
    // เช็คว่า phone_number ไม่ใช่ null และเป็นตัวเลขเท่านั้น 
    if (!phone_number.value && !isPhoneNumberValid.value) return false;
    // แปลง phone_number เป็น array ของตัวเลข แล้วใช้ reduce เพื่อรวมค่า 
    return phone_number.value
        .split('') // แยกแต่ละหลักของตัวเลข 
        .filter(char => !isNaN(char)) // กรองเฉพาะตัวเลข 
        .map(Number) // แปลงแต่ละหลักเป็นตัวเลข 
        .reduce((sum, num) => sum + num, 0); // รวมตัวเลขทั้งหมด 
});




const fetchLuckyNumberResult = async (sum) => {
  try {
    // Make the API call using $fetch
    const data = await $fetch(`/api/bers/${sum}`);

    // Check if the response has the success status
    if (data && data.status === 'success') {
    

      return data.result;
    } else {
      throw new Error(data?.message || 'Result not found');
    }
  } catch (err) {
    // Handle errors that occur during the API call
    console.error(err.message);
    return {
      status: 'error',
      message: err.message || 'An unknown error occurred',
    };
  }
};



// onMounted(async() => {
//     console.log( await fetchLuckyNumberResult(62))
// });






const fortune = ref(null)

watch(phone_number, async (newVal) => {

    if (newVal.length < 10) {
        fortune.value = null;
    }

    // Trim the phone number to 10 digits if it exceeds 10 digits
    if (newVal.length > 10) {
        phone_number.value = newVal.slice(0, 10); // Trim to 10 digits
    }

    if (newVal.length == 10 && isPhoneNumberValid.value) {
        fortune.value = await fetchLuckyNumberResult(luckyNumberSum.value)
    }
  


});

    
</script>

<template>
    <div class="d-flex align-items-center justify-content-center vh-100">

        <div class="bg-000 p-2 rounded-2 text-center" style="width:400px;height:350px;">
            <h1 class="pt-3 fs-3 text-888 fw-bold mb-3">กรุณาใส่เบอร์โทรศัพท์</h1>

            <input placeholder="เบอร์โทรศัพท์ 10 หลัก" v-model="phone_number" type="tel"  class="mb-3"
                :class="{ 'text-orange': phone_number }" style="font-size:1.8em;margin-bottom:5px;width:300px;" />
          
            <div class="border m-auto d-flex align-items-center justify-content-center" style="width:300px;height:100px;">

                <div v-if="!phone_number" class="loader"></div>
                <div v-if="phone_number && !isPhoneNumberValid" class="loader2"></div>


                <span v-if="isPhoneNumberValid" class="fs-1 text-white fw-bold">
                    {{ luckyNumberSum }}
                </span>


            </div>
            <div class="text-white mt-3">
  <span class="me-2" v-for="(s,i) in fortune?.score" :key="i">
    <i
      v-if="i === 'luck'"
      class="bi bi-star-fill"
      title="Luck"
      style="margin-right: 5px;"
    ></i>
    <i
      v-else-if="i === 'career'"
      class="bi bi-briefcase-fill"
      title="Career"
      style="margin-right: 5px;"
    ></i>
    <i
      v-else-if="i === 'relationship'"
      class="bi bi-heart-fill"
      title="Relationship"
      style="margin-right: 5px;"
    ></i>
    <i
      v-else-if="i === 'health'"
      class="bi bi-heart-pulse-fill"
      title="Health"
      style="margin-right: 5px;"
    ></i>
    <i
      v-else-if="i === 'wealth'"
      class="bi bi-currency-dollar"
      title="Wealth"
      style="margin-right: 5px;"
    ></i>
    {{ s }}
  </span>
</div>

            <div class="mt-1">
                <span class="text-success">
                    {{ fortune?.meaning}}
                </span>
            </div>
          
            
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
    border: none;
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




/* HTML: <div class="loader"></div> */
.loader {
  width: calc(80px / cos(45deg));
  height: 14px;
  background: repeating-linear-gradient(-45deg,#000 0 15px,red 0 20px) left/200% 100%;
  animation: l3 2s infinite linear;
}
@keyframes l3 {
    100% {background-position:right}
}




/* HTML: <div class="loader"></div> */
.loader2 {
  width: 50px;
  aspect-ratio: 1;
  color:#dc1818;
  background:
   radial-gradient(circle at 60% 65%, currentColor 62%, #0000 65%) top left,
   radial-gradient(circle at 40% 65%, currentColor 62%, #0000 65%) top right,
   linear-gradient(to bottom left, currentColor 42%,#0000 43%) bottom left ,
   linear-gradient(to bottom right,currentColor 42%,#0000 43%) bottom right;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  position: relative;
}
.loader2:after {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  opacity: 0.4;
  animation: l3 1s infinite;
}
@keyframes l3 {
  to {transform:scale(1.8);opacity:0}
}








</style>