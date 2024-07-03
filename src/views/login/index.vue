<template>
  <div class="login-main">
    <!-- 登录主题 -->
    <div class="input-main">
      <div class="login-title">欢迎登录</div>
      <div>
        <div class="label">账号</div>
        <div>
          <el-input
            v-model="loginInfo.number"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </div>
      </div>
      <div>
        <div class="label">密码</div>
        <div>
          <el-input
            v-model="loginInfo.pws"
            type="password"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </div>
      </div>
      <div>
        <div class="label">验证码</div>
        <div>
          <el-row>
            <el-col :span="17">
              <el-input
                v-model="loginInfo.verificationCode"
                placeholder="请输入验证码"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="5">
              <VerifyCode />
            </el-col>
          </el-row>
        </div>
      </div>

      <div>
        <el-button type="primary" style="width: 100%" @click="login">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VerifyCode from '../../components/VerificationCode'
import { loginFun } from '../../api/login'
export default {
  components: {
    VerifyCode,
  },
  data() {
    return {
      loginInfo: {
        number: '',
        pws: '',
        verificationCode: '',
        systemTitle: '自定义系统标题',
        iconImage: 'https://songxaing.top/miniadmin/favicon.ico',
      },
    }
  },
  methods: {
    login() {
      if (!this.loginInfo.number) {
        this.msgerror('请输入账号')
        return
      }
      if (!this.loginInfo.pws) {
        this.msgerror('请输入密码')
        return
      }
      if (!this.loginInfo.verificationCode) {
        this.msgerror('请输入验证码')
        return
      }
      // 调用登录方法
      loginFun(this.loginInfo)
        .then(() => {
          this.msgsuccess('登录成功')
          this.$router.replace('/home')
        })
        .catch(() => {
          this.msgsuccess('登录失败')
        })
    },
  },
}
</script>

<style scoped lang="less">
.login-main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/loginbg2.jpg');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .input-main {
    width: 500px;
    height: 500px;
    background-color: white;
    border-radius: 5px;
    padding: 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
}
.login-title {
  color: #409eff;
  font-size: 25px;
  font-weight: 700;
}
.label {
  margin-bottom: 10px;
}
</style>