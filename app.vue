<script setup>
  useHead({
    htmlAttrs: {
      lang: "pl",
    },
    bodyAttrs: {
      class: "bg-white dark:bg-slate-900 text-black dark:text-gray-300",
    },
    title: "wordDB",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Baza danych słówek",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  })
</script>
<template>
  <NuxtPage />
</template>
