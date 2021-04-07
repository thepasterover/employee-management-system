<template>
  <div class="mt-8 pa-2">
    <v-row align-content="space-between" justify="space-between">
      <v-col cols=2 md=8>
        <h3>Salaries</h3>
      </v-col>
      <v-col md=2 cols=4>
        <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
            <p
            v-bind="attrs" 
            v-on="on"
            class="appgrey--text"
            >
              {{$moment(month).format('MMM \'YY')}}
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
      </v-col>
    </v-row>
    <v-data-table
    :headers=headers
    class="mt-2 pa-2"
    >

    </v-data-table>
  </div>
</template>

<script>
export default {
    data() {
      return {
        month: this.$moment().format('YYYY-MM'),
        headers: [
          {text: 'Date', value: 'date', class: 'appgrey--text'},
          {text: 'Amount', value: 'amount', class: 'appgrey--text'},
          {text: 'Month', value: 'month', class: 'appgrey--text'},
          {text: 'Type', value: 'type', class: 'appgrey--text'},
        ],
      }
    }
}
</script>

<style scoped>

.theme--light .v-data-table .v-data-footer{
  border-top: 0;
}

.theme--light.v-data-table  .v-data-table__wrapper  table  thead  tr:last-child  th {
  border-bottom: 0;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
  border-bottom: 0;
}

</style>

//TODO: FUTURE add option disbuite salary