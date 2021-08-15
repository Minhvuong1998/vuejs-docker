<template>
  <div class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-6 form-block">
          <div class="mb-4">
            <h3>Sign In</h3>
          </div>
          <InputGroup
            v-model="v.email.$model"
            type="text"
            placeholder="your email..."
            label="Email"
            :error="v.email.$errors[0]?.$message"
          />
          <InputGroup
            v-model="v.password.$model"
            type="text"
            placeholder="your password..."
            label="Password"
            :error="v.password.$errors[0]?.$message"
          />
          <router-link :to="{ name: 'dashboard-search' }">
            <Button @click="doLogin">Login</Button>
          </router-link>
          <span class="d-block text-center my-4 text-muted">
            or sign in with</span>
          <div class="social-login text-center">
            <a href="#" class="google">
              <span class="icon-google mr-3">
                <i class="fab fa-google-plus-g" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { email,required } from "@vuelidate/validators";
import isNil from 'lodash/isNil';
import { defineComponent, reactive } from "vue";

import useCommon from "@/composables/common";
import { useValidation } from '@/composables/validation';
import { service } from "@/serviceApi";

export default defineComponent({
  setup() {
    window.userInfo = null;
    localStorage.removeItem('userInfo');
    const state = reactive({
      email: "vuong@gmail.com",
      password: "123",
    });
    const { apiOption, router, route } = useCommon();
    
    const authService = new service.Auth(apiOption());
    const rules = {
      email: {
        fieldLabel: 'Email',
        required,
        email,
      },
      password: {
        fieldLabel: 'Password',
        required,
      },
    };
    const { v, scrollToError, formModel } = useValidation(rules, state);

    const doLogin = async() => {
      v.value.$touch();
      if (v.value.$invalid) {
        return scrollToError();
      }
      const userInfo = await authService.Login(formModel);
      window.userInfo = userInfo.data;
      localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
      if (isNil(route.query.redirect)) {
        router.push({ name: 'dashboard-search', replace: true });
      } else {
        router.push(decodeURIComponent(<string>route.query.redirect));
      }
    };

    return {
      v,
      doLogin,
    };
  },
});
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  background-color: gainsboro;
}

.content {
  padding: 4rem 0;
}

.form-block {
  background: #fff;
  padding: 60px;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 991.98px) {
  .form-block {
    padding: 30px;
  }
}

@media (max-width: 991.98px) {
  .content .bg {
    height: 500px;
  }
}

.content .contents,
.content .bg {
  width: 50%;
}
@media (max-width: 1199.98px) {
  .content .contents,
  .content .bg {
    width: 100%;
  }
}

.content .btn {
  width: 100%;
  height: 54px;
  padding-left: 30px;
  padding-right: 30px;
}

.social-login a {
  text-decoration: none;
  position: relative;
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
}

.social-login a span {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.social-login a:hover {
  color: #fff;
}

.social-login a.google {
  background: #ea4335;
}

.social-login a.google:hover {
  background: #e82e1e;
}
</style>
