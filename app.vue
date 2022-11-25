<script setup>
import Swal from "sweetalert2";

let input = ref("");

const data = await $fetch("/api/words", {
  method: "GET",
});
const array = ref(data);

function popUp() {
  Swal.fire({
    title: "Dodaj tłumaczenie",
    html: `
            <input placeholder="Polskie słowo" type="text" id="polish" class="border rounded p-1">
            <input placeholder="Niemieckie słowo" type="text" id="deutsch" class="border rounded mt-1 p-1">
          `,
    width: 400,
    padding: "3em",
    color: "#716add",
    confirmButtonText: "Dodaj następne",
    showDenyButton: true,
    denyButtonText: "ok (wyjdź)",
    background: "#fff",
    backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    preConfirm: () => [
      document.querySelector("#polish").value,
      document.querySelector("#deutsch").value,
    ],
    preDeny: () => [
      document.querySelector("#polish").value,
      document.querySelector("#deutsch").value,
    ],
  }).then((res) => {
    if (res.value[0] !== "" && res.value[1] !== "") {
      if (res.isConfirmed) popUp();
      addWord(res);
      array.value.push({
        polishName: res.value[0],
        deutschName: res.value[1],
      });
    } else Swal.fire("Nie dodajesz żadnego słowa?", "kuźde", "question");
  });
}

async function addWord(res) {
  return await $fetch("/api/addWord", {
    method: "POST",
    body: {
      polishName: res.value[0],
      deutschName: res.value[1],
    },
  });
}
function filterArray() {
  return array.value.filter((item) => item.polishName.includes(input.value));
}
</script>
<template>
  <input type="text" placeholder="" />
  <div class="w-full flex flex-col justify-center items-center mt-1">
    <div class="space-x-4">
      <input
        class="w-72 px-3 py-6 text-base border"
        type="text"
        placeholder="Wyszukaj..."
        v-model="input"
        @change="filterArray()"
      />
      <button class="px-4 py-6 bg-slate-300 rounded" @click="popUp()">
        Dodaj
      </button>
    </div>
    <div class="mt-2">
      <ul v-if="!filterArray().length">
        <li v-for="item of array" :key="item">
          <p>{{ item.polishName }} | {{ item.deutschName }}</p>
        </li>
      </ul>
      <ul v-else>
        <li v-for="item of filterArray()" :key="item">
          <p>{{ item.polishName }} | {{ item.deutschName }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>