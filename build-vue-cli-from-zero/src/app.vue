<template>
<div>
    {{msg}}
    <Child/>
</div>
</template>

<script>
    import Child from './components/helloWorld.vue'
    export default{
        data(){
            return{
                msg:'Hello'
            }
        }
    }
</script>

<style>

</style>