<script setup>

definePageMeta({
    layout: 'berlnw'
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
    if (!phone_number.value && !isPhoneNumberValid.value) return 0;
    // แปลง phone_number เป็น array ของตัวเลข แล้วใช้ reduce เพื่อรวมค่า 
    return phone_number.value
        .split('') // แยกแต่ละหลักของตัวเลข 
        .filter(char => !isNaN(char)) // กรองเฉพาะตัวเลข 
        .map(Number) // แปลงแต่ละหลักเป็นตัวเลข 
        .reduce((sum, num) => sum + num, 0); // รวมตัวเลขทั้งหมด 
});

// Define the search function to call the API
const search = async (sum) => {
    try {
        // Call the API with the entered sum
        const response = await $fetch(`/api/bers/${sum}`);
        if (response.status == 'success') return response.result

    } catch (error) {
        // Handle the error and set the error message
        errorMessage.value = error.data?.message || 'An error occurred while fetching the result';
    }
};


const fortune = ref(null)

watch(phone_number, async (newVal) => {
    // Reset the fortune value if phone number length is less than 10
    if (newVal.length < 10) {
        fortune.value = null; // Corrected to `=` instead of `==`
        return; // Exit early if the length is less than 10
    }

    // Trim the phone number to 10 digits if it exceeds 10 digits
    if (newVal.length > 10) {
        phone_number.value = newVal.slice(0, 10); // Trim to 10 digits
    }

    // When the phone number is exactly 10 digits and valid, perform the search
    if (newVal.length === 10 && isPhoneNumberValid.value) {
        fortune.value = await search(luckyNumberSum.value);
    }
});

// Computed property to calculate the sum of the scores
const sumOfScores = computed(() => {
    if(!isPhoneNumberValid.value) return false
    if (fortune.value && fortune.value.score) {
        const { luck, career, relationship, health, wealth } = fortune.value.score;
        return luck + career + relationship + health + wealth;
    }
    return 0;
});

// Min and Max values
const minScore = 16;
const maxScore = 49;
// Computed property to calculate the percentage for the progress bar
const progressPercentage = computed(() => {
    if (sumOfScores.value) {
        return ((sumOfScores.value - minScore) / (maxScore - minScore)) * 100;
    }
    return 0; // return 0 if no sumOfScores available
});



</script>

<template>
    <div class="d-flex vh-100 align-items-center justify-content-center">
        <div class="input_container border rounded-2 p-2 text-center bg-111" style="border-color:#444 !important;">

            <h1 class="pt-3 fs-3 text-888 fw-bold mb-3">กรุณาใส่เบอร์โทรศัพท์</h1>
            <input placeholder="เบอร์โทรศัพท์ 10 หลัก" v-model="phone_number" type="tel"  class="mb-3"
                :class="{ 'text-orange': phone_number }" style="font-size:1.8em;margin-bottom:5px;width:300px;" />


            <div class="border m-auto rounded-3 d-flex align-items-center justify-content-center"
                style="border-color:#333 !important;width:300px;height:100px">
                <div v-if="!phone_number" class="loader"></div>
                <div v-else-if="!isPhoneNumberValid && phone_number" class="loader2"></div>
                <div v-else class="text-white fw-bold" style="font-size:3.5em;">
                    {{ luckyNumberSum }}
                </div>
            </div>

            <div v-if="fortune && isPhoneNumberValid" class="mt-3 m-auto" :class="{
                'text-success': fortune.category == 'very_fortunate',
                'text-info': fortune.category == 'fortunate',
                'text-warning': fortune.category == 'moderately_fortunate',
                'text-danger': fortune.category == 'unfortunate',
            }">{{ fortune.meaning }}</div>



            <div v-if="sumOfScores && isPhoneNumberValid" class="mt-2 m-auto" style="width:300px">
             
                <!-- Bootstrap Progress Bar -->
                <div class="progress" style="height: 30px;">
                    <div class="progress-bar fs-5 text-dark" role="progressbar"
                        :style="{ width: `${progressPercentage}%` }" :aria-valuenow="progressPercentage"
                        aria-valuemin="0" aria-valuemax="100">

                    </div>

                </div>
                <div v-if="fortune" class="mt-2">
                    <!-- Iterate over the scores and display corresponding Bootstrap icons and their values -->
                    <span v-for="(s, key) in fortune.score" :key="key" class="me-3">
                        <!-- Dynamically set the icon color inline based on the score -->
                        <i :class="{
                            'text-danger': s >= 0 && s <= 2,  // Red for low score (0-2)
                            'text-warning': s >= 3 && s <= 5, // Yellow for medium score (3-5)
                            'text-success': s >= 6 && s <= 8, // Green for high score (6-8)
                            'text-primary': s === 9           // Blue for excellent score (9)
                        }" v-if="key === 'luck'" class="bi bi-star-fill"></i>

                        <i :class="{
                            'text-danger': s >= 0 && s <= 2,
                            'text-warning': s >= 3 && s <= 5,
                            'text-success': s >= 6 && s <= 8,
                            'text-primary': s === 9
                        }" v-else-if="key === 'career'" class="bi bi-briefcase-fill"></i>

                        <i :class="{
                            'text-danger': s >= 0 && s <= 2,
                            'text-warning': s >= 3 && s <= 5,
                            'text-success': s >= 6 && s <= 8,
                            'text-primary': s === 9
                        }" v-else-if="key === 'relationship'" class="bi bi-heart-fill"></i>

                        <i :class="{
                            'text-danger': s >= 0 && s <= 2,
                            'text-warning': s >= 3 && s <= 5,
                            'text-success': s >= 6 && s <= 8,
                            'text-primary': s === 9
                        }" v-else-if="key === 'health'" class="bi bi-heart-pulse-fill"></i>

                        <i :class="{
                            'text-danger': s >= 0 && s <= 2,
                            'text-warning': s >= 3 && s <= 5,
                            'text-success': s >= 6 && s <= 8,
                            'text-primary': s === 9
                        }" v-else-if="key === 'wealth'" class="bi bi-cash-stack"></i>

                        <span class="ms-1 text-888">{{ s }}</span> <!-- Display the score next to the icon -->
                    </span>
                </div>
                <span class="text-555 fs-5">ผลทั้งหมด {{ sumOfScores }}</span>
            </div>

            <span v-if="(phone_number?.length == 10) && !isPhoneNumberValid"
                style="font-size:0.6em;color:red">กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง</span>



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
    height: 30px;
    aspect-ratio: 6;
    --c: #0000 64%, orange 66% 98%, #0000 101%;
    background:
        radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
        radial-gradient(35% 146% at 50% -59%, var(--c)) 25% 100%;
    background-size: calc(100%/3) 50%;
    background-repeat: repeat-x;
    clip-path: inset(0 100% 0 0);
    animation: l5 2.5s infinite linear;
}

@keyframes l5 {
    50% {
        clip-path: inset(0)
    }

    to {
        clip-path: inset(0 0 0 100%)
    }
}



/* HTML: <div class="loader"></div> */
.loader2 {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: black;
    box-shadow: 0 0 0 0 rgb(168, 255, 168);
    animation: l2 1.5s infinite linear;
    position: relative;
}

.loader2:before,
.loader2:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 0 0 #0004;
    animation: inherit;
    animation-delay: -0.5s;
}

.loader2:after {
    animation-delay: -1s;
}

@keyframes l2 {
    100% {
        box-shadow: 0 0 0 40px #0000
    }
}
</style>
