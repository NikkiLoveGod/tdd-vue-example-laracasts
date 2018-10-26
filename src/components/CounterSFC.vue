<template>
  <div>
    <div class="count">{{ count }}</div>
    <button @click="count++" class="increment">Increment</button>
    <button @click="count > 0 && count--" class="decrement">Increment</button>
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
