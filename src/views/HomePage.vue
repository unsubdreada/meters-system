<template>
  <div class="flex flex-col items-center mx-auto">
    <h1 class="text-3xl font-roboto text-white">Добро пожаловать</h1>
    <p class="text-white font-roboto">в сервис отслеживания показаний счетчиков</p>
    <router-link to="/authentication" class="m-5">
      <button
        class="bg-blue-500 hover:bg-blue-700 hover:text-cyan-300 text-white py-2 px-4 rounded active:bg-blue-900 transition duration-300 font-roboto shadow-lg"
      >
        Начать использование
      </button>
    </router-link>
  </div>
</template>
