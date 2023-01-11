<template>
    <div class="addEcopoint">

        <div>
            <b-form @submit="onSubmit">
                <b-form-file v-model="image" accept="image/*"></b-form-file>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </div>

    </div>
</template>
  


<script>
export default {
    data() {
        return {
            image: null
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            console.log(this.image) /* Alterar isto para guardar na base de dados */
        }
    }
}
</script>
  
  
  
<style scoped>
@import "../assets/css/addEcopoint.css";
</style>