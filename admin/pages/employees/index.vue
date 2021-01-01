<template>
  <div class="mt-3 pa-2">
    <v-row justify='end'> 
      <v-col>
        <h2 class="textheadpurple--text"> Employees </h2>
      </v-col>
      
      <v-col class="mb-2">
        <div class="text-right">
          <popup @add-employee="addEmployee"></popup>
        </div>
      </v-col>
      <v-col class="ml-4 pt-1" lg="3" cols=12>
        <v-text-field label="Search by name" outlined dense class="mt-1"> </v-text-field>
      </v-col>
      
    </v-row>

    <v-row justify="start" align="center">
      <v-col v-for="n in 4" :key="n" cols=12 md=4 sm=5>
        <v-card  max-width="320">
          <div class="text-right mt-2 mb-n8">
            <v-col>
              <v-speed-dial
                transition="slide-y-transition"
                direction="bottom"
                top
                right
                class="mr-n4"
              >
                <template v-slot:activator>
                  <v-icon size=23>mdi-dots-vertical</v-icon>
                </template>
                <v-btn
                  fab
                  dark
                  small
                  color="secondary"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="red"
                  right
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>
              
            </v-col>
          </div>
          <div class="text-center">
            <v-col class="pa-4 pt-8">
              <v-avatar
                color="primary"
                size="95"
              >
              <span class="white--text">VJ</span>
              </v-avatar>
              <h3 class="mt-6 textheadpurple--text">Raju Sharma</h3>
              <h4 class="subtextgrey--text mt-1">20 Oct 2020</h4>
              <v-row class="mt-0" justify="center" align="center">
                <v-col align-self="center" class="mr-n5">
                  <v-icon color="subtextgrey" size="18">mdi-calendar-outline</v-icon>
                </v-col>
                <v-col align-self="center" class="mr-n3"><v-progress-linear value=100 color="#2B51D6" rounded></v-progress-linear></v-col>
                <v-col align-self="center" class="mr-n3"><v-progress-linear value=100 color="#577BF9" rounded></v-progress-linear></v-col>
                <v-col align-self="center"><v-progress-linear value=55 color="#54B5FF" rounded></v-progress-linear></v-col>
                <v-col class="subtextgrey--text mt-3 ml-n5"><p >80%</p></v-col>
                
              </v-row>
              <h3 class="mt-4 mb-2 subtextgrey--text">SINGER</h3>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import popup from '../../components/popup.vue'
export default {
  components: { popup },
  data() {
    return {
      items: null
    }
  },
  methods: {
    addEmployee(e) {
      this.items.push(e)
    }
  }
}
</script>

<style  scoped>

</style>