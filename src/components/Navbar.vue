<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar_btn">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/store')">Store</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/about')">About</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-navbar',
};
</script>

<style scoped>
.navbar{
  height: 50px;
  background-color: grey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar_btn{
  margin-left: auto;
}
</style>