<script setup lang="ts"></script>
<template>
  <div class="title">卡片预览</div>
  <div class="box">
    <div class="card"></div>
  </div>
</template>
<style lang="less" scoped>
.title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
  background: #ffffff;
  box-shadow: 0 1px 6px #bbbbbb;
  border-bottom: solid 1px #f2f2f2;
}
.box {
  height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;
  .card {
    width: 744px;
    height: 1039px;
    border-radius: 30px;
    background: #ffffff;
    box-shadow: 6px 6px 20px #bbbbbb;
    margin: 0 auto;
  }
}
</style>
