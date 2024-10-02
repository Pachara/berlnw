<script setup>
definePageMeta({
    layout: 'berlnw'
})

const history = useState('history');







onMounted(async () => {



});




const test = ref(true);

</script>

<template>
    
    <div v-if="!loading" class="d-flex vh-100 align-items-center justify-content-center flex-column">
        <MainMenu  />

        <div class="input_container border rounded-2 p-2 text-center bg-111" style="border-color:#444 !important;">



            <h1 class="pt-3 fs-3 text-888 fw-bold mb-3">ประวัติการค้น</h1>
            <ul class="text-888 list-unstyled">
                <li v-for="(lead,i) in history" :key="i">{{i+1}}. {{ lead.phone_number }}</li>
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
