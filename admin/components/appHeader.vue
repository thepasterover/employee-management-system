<template>
  <div> 
    <v-toolbar class="px-2" width="100%">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <h3 class="pl-2" >Abarna Sports wear</h3>
      <v-spacer></v-spacer>
      <div v-if="$auth.loggedIn">
        <v-btn @click="$auth.logout()" 
        depressed
        color="error"
        >Logout</v-btn>
      </div>
      <!-- <div v-else>
        
      </div> -->
      <!-- <v-avatar color="#645DF6" size="35">
        <span class="white--text">VJ</span>
      </v-avatar> -->
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" color="white" app temporary>
      <v-list class="mt-2">
        <v-list-item v-for="(item, i) in navItems" :key="i" class="pl-8 mt-2 tile" :to="item.route" active-class="active--nav" nuxt>

          <v-list-item-icon>
            <v-icon color="black">{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="pl-1 black--text">
            <v-list-item-title>
              {{item.title}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    data() {
      return {
        drawer: false,
        navItems: [
          {title: 'Home', icon: 'mdi-home-variant-outline', route: '/'},
          {title: 'Employees', icon: 'mdi-account-group-outline', route:'/employees'},
          {title: 'Salary', icon: 'mdi-wallet-outline', route:'/salary'},
        ]
      }
    }
}
</script>

<style scoped>

.active--nav {
  color: white;
  background-color: #6659FF;
}

.tile:active {
  color: #ffffff;
  background: #6659FF;
}

.tile:hover {
  color: #ffffff;
  background: #6659FF;
}

</style>