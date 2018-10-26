<template>
  <div>
    <div class="count">{{ count }}</div>
    <button @click="count++">Increment</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }  
</script>
