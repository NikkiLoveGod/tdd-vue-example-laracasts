<template>
  <div class="question">
    <div v-if="! editing">
    <h1>{{ question.title }}</h1>
    <p class="body"> {{ question.body }}</p>
    
    <button id="edit" @click="editing = true">Edit</button>
    </div>
    
    <div v-if="editing">
      <input type="text" name="title" v-model="form.title">
      <textarea type="text" name="body" v-model="form.body"></textarea>
      
      <button id="cancel" @click="cancel">Cancel</button>
      <button id="update" @click="update">Update</button>
    </div>
    
    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['dataQuestion'],
    
    data() {
      return {
        question: { ...this.dataQuestion },
        form: {
          title: this.dataQuestion.title,  
          body: this.dataQuestion.body,  
        },
        editing: false,
        feedback: false
      }
    },
    
    methods: {
      cancel() {
        this.editing = false
      },
      
      update() {
        this.question.title = this.form.title
        this.question.body = this.form.body
        this.editing = false
        
        axios.post('/questions/1/')
          .then(() => {
            this.feedback = "Question updated successfully"
          })
      }
    }
  }
</script>