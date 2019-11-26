<template>
  <ul class="navbar-nav">
    <li class="nav-item" @click="$emit('toggle')">
      <a
        class="btn btn-menu c-button"
        data-offcanvas-trigger="off-canvas"
        role="button"
        aria-controls="off-canvas"
        aria-expanded="false"
      >
        <span class="c-button__text">Menu</span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.nav-item {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
}
.nav-item .btn {
  font-size: 30px;
}
.btn-menu {
  position: relative;
  text-indent: -9999px;
  overflow: hidden;
  cursor: pointer;
  outline: 0;
  margin: 0;
  padding: 0;
  border: none;
  height: 38px;
  width: 30px;
}
.btn-menu:before {
  top: 12px;
  display: block;
  content: " ";
  position: absolute;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #202020;
}
.btn-menu:after {
  top: 24px;
  display: block;
  content: " ";
  position: absolute;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #202020;
}
</style>
