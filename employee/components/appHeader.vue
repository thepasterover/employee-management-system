<template>
  <div v-if="$auth.loggedIn">
    <div align="center"> 
      <v-app-bar class="px-1 pa-1" flat>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <h2>{{currentHead}}</h2>
        <v-spacer></v-spacer>
        <v-avatar
          color="primary"
          size="40"
          class="white--text"
        >AJ</v-avatar>
      </v-app-bar>
    </div>
    <v-navigation-drawer v-model="drawer"  app >
      <v-list class="mt-2" nav>
        <v-list-item>
          <v-list-item-content class="pb-6">
            <v-list-item-title class="appmainblue--text">
              <v-icon class="mb-1 px-2" color="appmainblue">mdi-shopping-outline</v-icon>
              Abarna Sports Wear
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item 
        v-for="(item, i) in navItems" 
        :key="i" class="pl-8 mt-2 tile" 
        :to="item.route" 
        active-class="active--nav" 
        color="white" 
        nuxt
        @click="currentHead = item.title"
        >
          
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="pl-1 ">
            <v-list-item-title>
              {{item.title}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div v-if="$auth.loggedIn" class="text-center pb-6">
          <v-btn @click="$auth.logout()" 
          depressed
          class="error--text"
          >
          <v-icon color="error">mdi-logout-variant</v-icon>
          Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    data() {
      return {
        currentHead: 'Overview',
        drawer: true,
        navItems: [
          {title: 'Overview', icon: 'mdi-home-variant-outline', route: '/'},
          {title: 'Employees', icon: 'mdi-account-group-outline', route:'/employees'},
          {title: 'Salary', icon: 'mdi-wallet-outline', route:'/salary'},
        ]
      }
    }
}
</script>

<style scoped>

.active--nav {
  background-color: #316cf5;
}

/* .tile:active {
  color: #ffffff !important;
  background: #316cf5;
} */

.tile:hover {
  color: white !important;
  background: #316cf5;
}

</style>