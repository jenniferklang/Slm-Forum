<template>
  <div>
    <form class="formContainer">
      <div class="form-control mb-4">
        <label class="label">
          <span class="label-text">Post</span>
        </label>
        <textarea v-model="post" class="textarea textarea-bordered h-24" placeholder="Type here"></textarea>
      </div>

      <button class="btn btn-outline btn-primary mb-4" type="submit">Submit</button>
    </form>
  </div>
</template>




<script>
export default{
  data(){
    return{
      topic:"",
      post:""
    }
  },
methods: {
  submitForm(){
    postData = {topic: this.topic, post:this.post}

    axios.post('/api/postTopics', postData)
        .then(response => {

          console.log(response.data);
        })
        .catch(error => {

          console.error('Error:', error);
        });
    },
  },
  }




</script>
