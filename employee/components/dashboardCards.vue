<template>
  <div>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols=4>
        <v-card outlined class="mt-3">
          <v-card-title class="appgrey--text">
            {{ item.title }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    data() {
      return {
        items: [
          {title: 'Salary Chart'}
        ]
      }
    }
}
</script>