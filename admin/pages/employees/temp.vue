<template>
  <div>
    <v-data-table
    :headers=headers
    :items=items
    >
      <template v-slot:top>
        <v-toolbar
        flat
         class="mb-3">
        <v-toolbar-title>Employees</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <popup @add-employee="addToEmployees"></popup>
        
        </v-toolbar>
      </template>

      <template v-slot:item.actions = {item}>
        <v-icon
        small
        color="error"
        class="ml-3"
        @click="deleteEmployee(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Popup from '../../components/popup';
export default {
    components: {
      Popup
    },
    data() {
      return {
        headers: [
          {text: 'Joined Date', value: 'j_date', class: 'headpurple--text'},
          {text: 'Name', value: 'name', class: 'headpurple--text'},
          {text: 'Total Salary', value: 'salary', class: 'headpurple--text'},
          {text: 'Designation', value: 'designation', class: 'headpurple--text'},
          {text: 'Actions', value: 'actions', class: 'headpurple--text', sortable: false},
        ],

        items: [
          {
            j_date: '20 Oct 2020',
            name: 'Raju Sharma',
            salary: '29000',
            designation: 'Singer',
          },
          {
            j_date: '20 Oct 2020',
            name: 'Raju Sharma',
            salary: '29000',
            designation: 'Singer',
          },
          {
            j_date: '20 Oct 2020',
            name: 'Raju Sharma',
            salary: '29000',
            designation: 'Singer',
          },
        ]
      }
    },

    methods: {
      addToEmployees(e) {
        this.items.push(e)
      },

      deleteEmployee(item) {
        this.items = this.items.filter(i => i !== item)
      }
    }
}
</script>

<style scoped>

.v-data-table {
  color: #405793;
}

</style>