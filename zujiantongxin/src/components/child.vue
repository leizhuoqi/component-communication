<template>
  <div>
    <h2>{{msg1}}</h2>
  </div>
</template>
<script>
    export default{

      data(){
        return{
            msg1:'',
        }
      },
      mounted(){
          this.$emit('getMessage','我是父组件（子组件传给我的哟）')
      },
      methods:{
          igetMsg(msg1){
              this.msg1 = msg1
          }
      }
    }
</script>
<style>

</style>
