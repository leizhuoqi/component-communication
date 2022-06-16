<template>
  <div class="hello">
    <h1>{{title}}</h1>
    <Child @getMessage = "showMessage" ref="msg"/>

  </div>
</template>

<script>
  import Child from './child.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg2:"我是子组件2",
      msg3:3+3,
      title:''
    }
  },
  components:{
      Child
  },
  methods:{
      showMessage(title){
          this.title = title
      }
  },
  mounted(){
      console.log(this.$refs.msg.igetMsg)
      this.$refs.msg.igetMsg(this.msg2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
