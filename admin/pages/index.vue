<template>
  <div>
    <h1>Welcome, Admin</h1>
    <!-- <v-btn @click="$auth.logout()">Logout</v-btn> -->
    <v-card outlined class="mt-3">
      <v-card-title>
        All Employees
      </v-card-title>
      <v-divider class="mx-2"></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row class="px-2">
              <v-icon size="29">mdi-account-outline</v-icon>
              <h1 class="px-2 mt-2">4</h1>
              <div class="text-center">
              <p class="caption-2 ">Employees</p> </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped>
/* .no_employees{
  font-size: 40px;
} */
</style>

// $auth.$storage.setCookie('_token.local', {expires: Date.now()})