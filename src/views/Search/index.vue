<script setup lang="ts">
import autoBotApi from '@/api/autoBotApi'
import type{ ISearch } from '@/api/type'
import { millisecondsToSeconds, numberWithCommas } from '@/utils/common'

const route = useRoute()
const router = useRouter()
const results = ref<ISearch>()
const input = ref(route.query.q)
const isLoading = ref(false)
const executeTime = ref(0)
const onSearch = () => {
  if (input.value)
    router.replace({ query: { q: input.value } })
}
async function search() {
  isLoading.value = true
  const start = performance.now()
  if (!route.query.q)
    return
  const res = await autoBotApi.search(route.query.q as string) as unknown as ISearch
  results.value = res
  const end = performance.now()
  executeTime.value = millisecondsToSeconds(end - start)
  isLoading.value = false
}
search()
const countResult = computed(() => {
  if (!results.value)
    return 0
  return numberWithCommas(results.value.number_of_results)
})
const resultsList = computed(() => {
  if (!results.value)
    return []
  return results.value.results
})
const suggestions = computed(() => {
  if (!results.value)
    return []
  return results.value.suggestions
})
const infoboxesList = computed(() => {
  if (!results.value)
    return []
  return results.value.infoboxes
})
watch(() => route.query.q, () => search())
</script>

<template>
  <div class="px-3 mx-auto mt-8 max-w-7xl">
    <div class="flex items-center mb-2 space-x-3">
      <div class="relative flex items-center space-x-2 cursor-pointer" @click="router.push('/')">
        <Icon
          icon="logos:google"
          class="text-2xl text-gray-500"
        />
        <p class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
          Clone
        </p>
      </div>
      <div class="flex items-center flex-1 w-full mr-auto border rounded-full lg:max-w-2xl hover:shadow-md">
        <div class="pl-5">
          <svg
            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2"
            @click="onSearch"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="input" type="text" class="w-full bg-transparent rounded-full py-[14px] pl-4 outline-none"
          @keydown.enter="onSearch"
        >
        <div class="pr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600 cursor-pointer" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path
              stroke-linecap="round" stroke-linejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="!isLoading" class="space-y-4">
      <p class="text-md opacity-90">
        Khoảng {{ countResult }} kết quả ({{ executeTime }} giây)
      </p>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div class="order-2 col-span-full lg:order-none lg:col-span-8">
          <div class="flex flex-col gap-4">
            <div v-if="suggestions.length">
              <div class="mb-2 font-bold">
                Suggestions:
              </div>
              <div class="grid grid-cols-2 gap-1.5 divide-x lg:grid-cols-4">
                <a
                  v-for="(value, name, index) in suggestions"
                  :key="index"
                  class="px-2 text-sm text-gray-600 cursor-pointer text-light hover:text-black"
                  @click="
                    input = value;
                    onSearch();
                  "
                >
                  {{ value }}
                </a>
              </div>
            </div>
            <div v-for="(res, index) in resultsList" :key="index">
              <a :href="res.url">
                <h5 class="mb-1 text-xl font-extrabold text-cyan-700 ">
                  {{ res.title }}
                </h5>
                <p class="text-sm font-medium">{{ res.content }}</p>
                <div class="flex flex-col">
                  <div class="flex">
                    <div
                      v-for="(engines, enginesIndex) in res.engines"
                      :key="enginesIndex"
                      class="mt-2 mr-2 text-sm font-light text-teal-800"
                    >
                      {{ engines }}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="order-1 col-span-full lg:order-none lg:col-span-4">
          <div v-if="infoboxesList.length" class="flex flex-col gap-4 mb-4 rounded-lg">
            <div
              v-for="(inf, index) in infoboxesList"
              :key="index"
              class="p-3 border border-gray-300 rounded-lg shadow-md"
            >
              <h4
                class="pb-2 mb-2 text-xl font-bold border-b border-gray-300"
              >
                {{ inf.infobox }}
              </h4>
              <div
                v-if="inf.img_src"
                class="flex items-center justify-center w-full mx-auto my-4"
              >
                <img
                  :src="inf.img_src"
                  :alt="inf.infobox"
                  class="h-[240px] w-auto"
                >
              </div>
              <p
                class="pb-2 mt-4 mb-2 text-sm italic font-medium leading-relaxed text-gray-800 border-b border-gray-300"
              >
                {{ inf.content }}
              </p>
              <ul
                v-if="inf.attributes?.length"
                class="flex flex-col gap-4 my-4"
              >
                <li
                  v-for="(attr, attrIndex) in inf.attributes"
                  :key="attrIndex"
                  class="text-sm columns-2"
                >
                  <div class="font-bold column">
                    {{ attr.label }}
                  </div>
                  <div class="column">
                    {{ attr.value }}
                  </div>
                </li>
              </ul>
              <div v-if="inf.urls?.length" class="flex flex-wrap gap-2">
                <a
                  v-for="(url, urlIndex) in inf.urls"
                  :key="urlIndex"
                  :href="url.url"
                  class="px-3 py-1 text-xs text-white transition-all rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-800"
                >
                  {{ url.title }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-center w-full h-[300px]">
        <div class="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-gray-400 animate-spin" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="mt-2 text-gray-400">Đang tải...</span>
        </div>
      </div>
    </div>
  </div>
</template>
