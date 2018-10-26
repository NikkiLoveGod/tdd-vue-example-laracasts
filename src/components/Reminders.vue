<template>
  <div>
    <input type="text" class="new-reminder" v-model="newReminder">
    <button @click="add">Add</button>
    
    <ul v-if="reminders.length">
      <li v-for="reminder in reminders" :key="reminder">
        {{ reminder }}
        <button class="delete" @click="del(reminder)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newReminder: '',
        reminders: []
      }
    },
    
    methods: {
      add () {
        this.reminders.push(this.newReminder)
      },
      
      del(reminder) {
        this.reminders.splice(reminder, 1)
      }
    }
  }
</script>