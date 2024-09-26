<script setup>

definePageMeta({
  layout: 'kobdemy'
})

const route = useRoute()

</script>

<template>
    <div>
        This is Course with ID = {{ route.params.id }}
    </div>
</template>

<style scoped>
</style>