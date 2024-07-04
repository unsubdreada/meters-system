<template>
  <Notification />
  <div class="w-4/5 mx-auto min-h-screen flex flex-col">
    <HeaderComp class="fixed w-3/4 mx-auto flex justify-between items-center p-5" />
    <RouterView class="flex-1 justify-center w-full" />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import HeaderComp from './components/HeaderComp.vue'
import Notification from '@/components/layout/Notification.vue'
export default {
  components: {
    RouterView,
    HeaderComp,
    Notification
  }
}
</script>
