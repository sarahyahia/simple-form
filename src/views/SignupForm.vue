<template>
<!-- <div> -->
  <v-app class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-md-3 mt-3 vue-bg h-100 d-flex justify-content-center align-items-center">
          <img alt="Vue logo" src="../assets/logo.png" width="100">
        </div>
        <div class="col-md-9 h-100 d-flex justify-content-center align-items-center">
          <div class="col-md-8 rounded px-5 py-5 shadow bg-white text-left">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  </v-app>
<!-- </div> -->
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
export default {
  name: 'Signup',
  components: {
    SignupForm,
  },
  mounted(){
    document.title="Signup | Store App";

  }
}
</script>
