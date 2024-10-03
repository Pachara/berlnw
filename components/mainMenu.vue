<script setup>
const route = useRoute();

const shoppingCartNumber = useState('shoppingCartNumber');







</script>
<template>
    <div>
        
        <nav>
            <ul class="list-unstyled  d-flex">
                <!-- ตรวจเบอร์มงคล -->
                <li class="me-2 p-1">

                    <NuxtLink to="/berlnw" 
                        :class="{ 'active text-orange': route.path === '/berlnw', 'text-white': route.path !== '/berlnw' }">
                        ตรวจเบอร์มงคล
                    </NuxtLink>

                   
                </li>


                <li class="me-2 p-1">
                    <NuxtLink to="/shopping_cart" style="font-size:0.9em;"
                        :class="{ 'active text-orange': route.path === '/shopping_cart', 'text-white': route.path !== '/shopping_cart' }">
                        Shopping Cart
                    </NuxtLink>
                </li>


                <!-- รายการเบอร์ที่เคยค้น -->
                <li class="me-2 p-1">
                    <NuxtLink to="/console" style="font-size:0.9em;"
                        :class="{ 'active text-orange': route.path === '/console', 'text-white': route.path !== '/console' }">
                        CONSOLE
                    </NuxtLink>
                </li>

                <li class="me-2 p-1">
                    <NuxtLink to="/history" style="font-size:0.9em;"
                        :class="{ 'active text-orange': route.path === '/history', 'text-white': route.path !== '/history' }">
                        ประวัติการค้น
                    </NuxtLink>
                </li>
                <li class="me-2 p-1">
                    <NuxtLink to="/shopping_cart" style="font-size:0.9em;"
                        :class="{ 'active text-orange': route.path === '/shopping_cart', 'text-white': route.path !== '/shopping_cart' }">
                    Cart [{{ shoppingCartNumber }}]
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style scoped>
li a {
    text-decoration: none !important;
}

.active {
    font-weight: bold !important;
}
</style>