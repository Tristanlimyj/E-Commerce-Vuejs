<template>
  <div class="admin">
    <b-container fluid>
      <b-row>
        <b-col xs="12" sm="12" md="3" lg="3">
          <div class="admin-menu">
              <h2>Using</h2>
              <router-link to="/admin/dashboard">Products</router-link><br>
              <router-link to="/admin/add-product">Add Products</router-link><br>
              <router-link to="/admin/mixer">Mixer</router-link><br>
              <router-link to="/admin/addon">Add On</router-link><br>
              <h2>Prototype</h2>
              <router-link to="/admin/cart">Cart</router-link><br>
              <router-link to="/admin/orders">Orders</router-link><br>
              <router-link to="/admin/registration">New Admin</router-link><br>
              <router-link to="/admin/feedback">Customer Contact Forms</router-link><br>
          </div>
        </b-col>
        <b-col xs="12" sm="12" md="9" lg="9">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
