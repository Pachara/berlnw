<script setup>

const emit = defineEmits(['deleteFromCart']);

const handleDelete = (item) => {
  emit('deleteFromCart', item);  // Emit event with the item to be deleted
};

const props = defineProps({
  shopping_cart: {
    type: Array,
    required: true
  },
  deleteFromCart: {
    type: Function,
    required: true
  }

});




onMounted(async () => {
    console.log(props.shopping_cart)
});




</script>
<template>
    <div>

        <div class="bg-white position-absolute m-3" style="width:200px;height:200px;top:0;right:0">
          <h5>Shopping Cart</h5>
          <ul class="text-888 list-unstyled">
                <li v-for="(xx,i) in shopping_cart" :key="i">{{i+1}}. {{ xx.phone_number }}
                  <button @click="handleDelete(xx)">X</button>
                </li>
            </ul>
            <button>Send To Parent</button>
        </div>

      

    </div>
</template>
<style scoped>
</style>