<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl font-roboto text-white">Добавление показаний</h1>
    <p class="text-sm font-roboto text-white">
      {{ address.city }}, {{ address.street }}, д.{{ address.house }}, кв.{{ address.apartment }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true
    },
    meters: {
      type: Array,
      required: true
    }
  }
}
</script>
