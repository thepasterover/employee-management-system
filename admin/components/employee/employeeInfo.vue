<template>
	<div>
		<v-card max-width="600" elevation="0">
      <v-row class="pa-4" >
        <h3 class="textheadpurple--text">Employee Info</h3>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pa-7 pb-10 mt-n3" justify="center" align="center" align-content="center">
        <v-col class="pl-6 pt-5" cols="12" lg="4" align-self="center" offset="5" offset-sm="7" offset-md="0" >
          <v-avatar color="mainpurple" size="110">
            <span class="white--text"> VJ </span>
          </v-avatar>
        </v-col>
        <v-col class="mb-n7" offset="1" offset-sm=2 offset-md="0">
          <v-row class="mt-n3">
              <v-col cols="5">
                <h4 class="subtextgrey--text subtitle-1 text-capitalize">Joined Date: </h4> 
              </v-col>
              <v-col cols="6">
                <h4 class="textheadpurple--text">{{ $moment(employeeData.date).format('DD MMM YYYY') }}</h4>
              </v-col>
          </v-row>
          <v-row class="mt-n5">
              <v-col cols="5">
                <h4 class="subtextgrey--text subtitle-1 text-capitalize">Name: </h4> 
              </v-col>
              <v-col cols="6">
                <h4 class="textheadpurple--text text-capitalize">{{employeeData.name}}</h4>
              </v-col>
          </v-row>
          <v-row class="mt-n5">
              <v-col cols="5">
                <h4 class="subtextgrey--text subtitle-1 text-capitalize">Email: </h4> 
              </v-col>
              <v-col cols="6">
                <h4 class="textheadpurple--text ">{{employeeData.email}}</h4>
              </v-col>
          </v-row>
          <v-row class="mt-n5">
              <v-col cols="5">
                <h4 class="subtextgrey--text subtitle-1 text-capitalize">Designation: </h4> 
              </v-col>
              <v-col cols="6">
                <h4 class="textheadpurple--text text-capitalize">{{employeeData.desg}}</h4>
              </v-col>
          </v-row>
          <v-row class="mt-n5">
              <v-col cols="5">
                <h4 class="subtextgrey--text subtitle-1 text-capitalize">Status: </h4> 
              </v-col>
              <v-col cols="6">
                <h4 class="textheadpurple--text text-capitalize">{{employeeData.status}}</h4>
              </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
	</div>
</template>

<script>

export default {
  props: ['employeeData']
}

</script>