<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="shop">Shop</label>
            <select name="shop" v-model="selectedShop" class="form-control">
              <option value="">Select a shop</option>
              <option
                v-for="shop in shopDetails"
                :key="shop.id"
                :value="shop.id"
              >
                {{ shop.name }}
              </option>
            </select>
            <ErrorMessage name="shop" class="error-feedback" />
          </div>

          

          <div class="form-group">
            <label for="role">Role</label>
            <select name="role" v-model="selectedRole" class="form-control">
              <option value="">Select a Role</option>
              <option :key="1" :value="ADMIN">Admin</option>
              <option :key="2" :value="USER">User</option>
            </select>
            <ErrorMessage name="role" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ShopService from "../services/shop.service";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      shop: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      
    });

    return {
      shopDetails: [],
      successful: false,
      loading: false,
      message: "",
      schema,
      selectedRole: null,
      ADMIN: 1,
      USER: 2,
      selectedShop: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    ShopService.fetchAllShop().then(
      (response) => {
        console.log(JSON.stringify(response));
        this.shopDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      user.shop = this.selectedShop;
      user.role = this.selectedRole;
      console.log("000 "+JSON.stringify(user, undefined,2))
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          console.log("======"+data);
          this.message = data;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

