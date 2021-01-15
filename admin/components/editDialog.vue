<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-card>
      <v-container>
          <v-card-title>
            <h3 class="textheadpurple--text">Edit Employee</h3>
          </v-card-title>
          <v-card-text>
           <v-form ref="form">
             <v-menu offset-y>
               <template v-slot:activator="{ on, attrs }">
                  <v-text-field color="mainpurple"
                  label="Joined Date" :value="formattedDate" v-bind="attrs" v-on="on"></v-text-field>
                </template>
              <v-date-picker v-model="joined" color="mainpurple"></v-date-picker>
             </v-menu>
             <v-text-field
                color="mainpurple"
                label="Name" 
                v-model="name"
              ></v-text-field>
              <v-text-field
              color="mainpurple"
              label="Designation" 
              v-model="designation"
              >
              </v-text-field>
              <v-text-field
              color="mainpurple"
              label="Attendance" 
              v-model="attendance"
              >
              </v-text-field>
              <v-row justify="end">
                <v-btn text class="mainpurple mr-10 mt-3 white--text text-capitalize" @click="submit">Edit Employee</v-btn>
              </v-row>
           </v-form>
          </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  props: ['dialog' , 'item'],

  data() {
    return {
      temp: null,
      joined: null,
      name: null,
      designation: null,
      attendance: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 4 || 'Name must be more than 4 characters'
      ],
      designationRules: [
        v => !!v || 'Designation is required',
        v => v.length >= 4 || 'Designation must be more than 4 characters'
      ]
    }
  },

  methods: {
    submit() {
      if(this.$refs.form.validate()){
        this.temp = {
          id: this.item.id,
          date: this.joined,
          name: this.name,
          desg: this.designation,
          attendance: this.attendance
        }
        
        this.$emit('edit-employee', this.temp)
        this.temp = null
        this.dialog = false
        this.joined = null
        this.name =  null
        this.desg = null
        this.attendance = null
      }
    }
  },

  mounted() {
    this.joined = this.item.date
    this.name = this.item.name
    this.desg = this.item.desg
    this.attendance = this.item.attendance
  },
  
  // destroyed(){
  //   this.dialog = false
  // },

  computed: {
    formattedDate(){
        return this.joined ? moment(this.joined).format('DD MMM YYYY') : ''
    }
  }
}
</script>