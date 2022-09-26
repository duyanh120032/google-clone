<script setup lang="ts">
import autoBotApi from '@/api/autoBotApi'
const route = useRoute()
const results = ref()
async function search() {
  if (!route.query.q)
    return
  const res = await autoBotApi.search(route.query.q as string)
  results.value = res
}
search()
</script>

<template>
  <pre>
    Search {{ results }}
  </pre>
</template>
