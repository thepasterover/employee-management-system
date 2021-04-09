<template>
  <div class="pa-1">
    <v-row align-content="space-between" justify="space-between" class="pl-4">
      <v-col cols=3 md=8>
        <h3>My Works</h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md=2 cols=4 class="pl-4 mt-3">
        <v-row>
        <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
            <p
            v-bind="attrs" 
            v-on="on"
            class="appgrey--text"
            >
            <span v-if="month">{{$moment(month).format('MMM \'YY')}}</span>
            <span v-else>Filter</span>
            
              <v-icon
              color="appgrey"
              >
              mdi-chevron-down
              </v-icon>
            </p>
            </template>
            <v-date-picker
            v-model="month"
            type="month"
            color="appmainblue"
            elevation="0"
            min="2021-01"
            ></v-date-picker>
          </v-menu>
          <v-icon
          color="appgrey"
          size=20
          v-if="month"
          @click="month=null"
          class="mb-4 pl-1"
          >
            mdi-close-circle
          </v-icon>
          </v-row>
      </v-col>
    </v-row>
    <v-data-table
    :headers=headers
    class="mt-2 pa-2"
    :items=filteredItems
    >
      <template v-slot:[`item.total`] = {item}>
        {{item.price * item.quantity}}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  middleware:'auth',
  head() {
    return{
        title: 'Work'
    }  
  },
  data() {
    return{
      month: null,
      items: [],
      headers: [
        {text: 'Date', value: 'date', class: 'appgrey--text'},
        {text: 'Category', value: 'category', class: 'appgrey--text'},
        {text: 'Price', value: 'price', class: 'appgrey--text'},
        {text: 'Quantity', value: 'quantity', class: 'appgrey--text'},
        {text: 'Total', value: 'total', class: 'appgrey--text'},
      ],
    }
  },

  async created() {
    try {
      let data = await this.$axios.$get('employee/works')
      data.forEach(d => {
        d.date =  this.$moment(d.date).format('DD MMM YYYY')
      })
      this.items = [...data]
    } catch(err) {
      console.log(err)
    }
  },

  computed: {
    filteredItems() {
      if(this.month){
        return this.items.filter(item => {
          return this.$moment(this.month).format('MMMMYY').toLowerCase() == this.$moment(item.date).format('MMMMYY').toLowerCase()
        })
      } else{
        return this.items
      }
      
    }
  }
}
</script>