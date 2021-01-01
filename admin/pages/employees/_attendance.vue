<template>
  <h1>{{hello}}</h1>
</template>

<script>
export default {
  data() {
    return {
      hello: this.$route.params.attendance
    }
  }
}
</script>