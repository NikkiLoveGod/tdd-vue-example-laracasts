export default {
  template: `
    <div>
      <div class="count">{{ count }}</div>
      <button @click="count++">Increment</button>
    </div>
  `,
  
  data() {
    return {
      count: 0
    }
  }
}