<template>
  <div class="bg">
    <div class="content">
      <div class="login-left">
        <div class="top">
          <img src="../../assets/nftmusic.png" />
          <p>Nft音乐系统</p>
        </div>
        <a-form-model ref="ruleForm" :model="formInline" :rules="rules">
          <a-form-model-item prop="account">
            <a-input
              v-model="formInline.account"
              size="large"
              placeholder="请输入手机号"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="passwd">
            <a-input
              size="large"
              v-model="formInline.passwd"
              type="password"
              placeholder="请输入密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-checkbox 
            @change="onChange" 
            class="btnremember" 
            :checked="checked"
          >
            记住密码
        </a-checkbox>
          <a-form-model-item>
            <a-button
              size="large"
              type="primary"
              style="width: 100%"
              @click="handleSubmit"
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <div class="fo">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // let validatePsw = (rule, value, callback) => {
    //     if (value) {
    //         if (value.length < 6) {
    //             callback('密码不能少于6位数');
    //         } else if (value.length > 20 && value.length !== 32) {
    //             callback('密码不能大20位数');
    //         } else {
    //             callback();
    //         }
    //     } else {
    //         callback();
    //     }
    // };
    // let validatePhone = (rule, value, callback) => {
    //     if (value) {
    //         value = value.trim();
    //         if (!window.phoneRule.test(value)) {
    //             callback('请输入正确的手机号码');
    //         } else {
    //             callback();
    //         }
    //     } else {
    //         callback();
    //     }
    // };
    return {
      checked: false,
      img: "",
      remember: true,
      capId: "",
      formInline: {
        account: "",
        capId: "",
        captcha: "",
        passwd: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "change" }],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "change" },
        ],
        passwd: [
          { required: true, message: "请输入密码！", trigger: "change" },
        ],
      },
    };
  },
  mounted() {

  },
  components: {
    
  },
  created(){
    if(localStorage.accountNumber !== undefined){
      this.checked = true
    }else{
      this.checked = false
    }
    this.formInline.account = localStorage.accountNumber
    this.formInline.passwd = localStorage.password
    if(localStorage.accountNumber == ''||localStorage.accountNumber == undefined){
      console.log(123)
    }
  },
  methods: {
    onChange(e){
      this.checked = e.target.checked
      console.log(this.checked)
    },
    //验证码
    // getCaptcha() {
    //   this.$get("/api/v1.0/cloud/auth/captcha").then((res) => {
    //     if (res.code == 0) {
    //       this.img = res.data.CapImg;
    //       this.capId = res.data.CapId;
    //     }
    //   });
    // },

    handleSubmit(e){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$post("/api/v1.0/cloud/auth/admin/login", {
            Phone: this.formInline.account,
            CapId: this.capId,
            Captcha: this.formInline.captcha,
            UserPassword: this.formInline.passwd,
          }).then((res) => {
            if (res.code == 0) {
              localStorage.token = res.data.Token;
              location.Phone = 
              this.$router.push("/app/home/user");
            }
          });
        } else {
          return false;
        }
      });
      if(this.checked == true){
        localStorage.accountNumber = this.formInline.account;
        localStorage.password = this.formInline.passwd;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.bg {
  height: 100vh;
  background-size: cover;
}
.content {
  min-height: 787px;
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  .right-banner {
    float: left;
    width: 667px;
    height: 608px;
    margin-top: 98px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .login-left {
    width: 424px;
    height: 472px;
    // margin-top: 198px;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    padding: 40px;
    margin: 100px auto;
    .top {
      display: flex;
      text-align: center;
      justify-content: center;
      margin-bottom: 20px;
      > img {
        width: 44px;
        height: 44px;
      }
      > p {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 33px;
        margin-left: 10px;
      }
    }
  }
}
.top {
  // text-align: center;
  h1 {
    color: #4d83ff;
    font-size: 22px;
    margin-bottom: 12px;
  }
  p {
    color: #999;
    font-size: 16px;
    margin-bottom: 30px;
  }
}
.fo {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
.btnremember{
  margin-bottom: 20px;
}
</style>