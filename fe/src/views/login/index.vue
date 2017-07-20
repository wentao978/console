<template>
	<div class="login-container">
		<canvas id="root" width="100%" height="100%"></canvas>
		<el-select style="width: 165px" class="language" v-model="lan" @change="changeLan" placeholder="切换语言">
			<el-option :key="zh" label="中文(Chinese)" :value="zh"></el-option>
			<el-option :key="en" label="英文(English)" :value="en"></el-option>
		</el-select>
		<el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
			<h3 class="title">{{ $t('login.systemLogin') }}</h3>
			<el-form-item prop="email">
				<span class="svg-container"><wscn-icon-svg icon-class="jiedianyoujian"/></span>
				<el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" :placeholder=" $t('login.email') "></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container"><wscn-icon-svg icon-class="mima"/></span>
				<el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder=" $t('login.password') "></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
					{{ $t('login.login') }}
				</el-button>
			</el-form-item>
			<div class='tips'>{{ $t('login.adminTips') }}</div>
			<div class='tips'>{{ $t('login.editorTips') }}</div>
		</el-form>
	</div>
</template>

<script>
import {
	mapGetters
} from 'vuex';
import {
	isWscnEmail
} from 'utils/validate';
import CanvasAnimate from 'utils/CanvasAnimate';
import CookieUtil from 'utils/cookieUtil'
// import { getQueryObject } from 'utils';
// import socialSign from './socialsignin';
export default {
	components: {},
	name: 'login',
	data() {
		let _this = this;
		const validateEmail = (rule, value, callback) => {
			if (!isWscnEmail(value)) {
				callback(new Error(_this.$t('login.correctEmail')));
			} else {
				callback();
			}
		};
		const validatePass = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error(_this.$t('login.minPassword', {
					num: 6
				})));
			} else {
				callback();
			}
		};
		return {
			lan: window.localStorage.getItem('lan') || '',
			zh: 'zh',
			en: 'en',
			loginForm: {
				email: 'admin@gionee.com',
				password: ''
			},
			loginRules: {
				email: [{
					required: true,
					trigger: 'blur',
					validator: validateEmail
				}],
				password: [{
					required: true,
					trigger: 'blur',
					validator: validatePass
				}]
			},
			loading: false,
			showDialog: false
		}
	},
	computed: {
		...mapGetters([
			'auth_type'
		])
	},
	methods: {
		changeLan() {
			//   debugger;
			if (this.lan === 'zh') {
				window.localStorage.setItem('lan', 'zh');
			}
			if (this.lan === 'en') {
				window.localStorage.setItem('lan', 'en');
			}

			window.location.reload();
			this.$i18n.locale = window.localStorage.getItem('lan');
			// if ( window.localStorage.getItem('lan') === 'zh') {
			//     this.zh = '中文';
			//     this.en = 'English';
			// }else{
			//     this.zh = 'Chinese';
			//     this.en = 'English';
			// }
		},
		handleLogin() {
			let _this = this;
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.loading = true;

					this.$store.dispatch('LoginByEmail', this.loginForm).then(response => {
						//   console.log(CookieUtil);
						//    debugger;
						if (response.data.error) {
							this.loading = false;
							CookieUtil.delCookie('Admin-Token');
							this.$message({
								message: response.data.msg,
								type: 'error'
							});
						} else {
							this.loading = false;
							this.$router.push({
								path: '/'
							});
							//    window.location.reload();

						}

						// this.showDialog = true;
					}).catch(() => {
						//    debugger;
						this.$message({
							message: _this.$t('login.correctUsername'),
							type: 'error'
						});

						// this.$message.error(err);
						this.loading = false;
					});
				} else {
					return false;
				}
			});
		},
		afterQRScan() {
			// const hash = window.location.hash.slice(1);
			// const hashObj = getQueryObject(hash);
			// const originUrl = window.location.origin;
			// history.replaceState({}, '', originUrl);
			// const codeMap = {
			//   wechat: 'code',
			//   tencent: 'code'
			// };
			// const codeName = hashObj[codeMap[this.auth_type]];
			// if (!codeName) {
			//   alert('第三方登录失败');
			// } else {
			//   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
			//     this.$router.push({ path: '/' });
			//   });
			// }
		}
	},
	created() {
		// window.addEventListener('hashchange', this.afterQRScan);
	},
	mounted() {
		let root = document.querySelector("#root")
		root.width = document.body.clientWidth;
		root.height = document.body.clientHeight;
		let a = new CanvasAnimate(root, {
			length: 50,
			clicked: true,
			moveon: true
		})
		a.Run()
	},
	destroyed() {
		// window.removeEventListener('hashchange', this.afterQRScan);
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
#root {
    position: absolute;
    left: 0;
    top: 0;
}
.language {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    & .el-input__icon+.el-input__inner {
        color: #000;
        height: 36px;
        line-height: 36px;
		padding-right: 32px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
    }
    & .el-input__icon {
        height: 36px;
        margin-top: -5px;
    }
}
.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
}
.login-container {
    @include relative;
    background-color: #f7fafc;
    @media (max-width:400px) {
        & {
            display: flex;
            flex: 1;
        }
    }
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: #eeeeee;
        height: 47px;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
    }

    .title {
        font-size: 26px;
        height: 36px;
        line-height: 36px;
        font-weight: 400;
        color: #eeeeee;
        margin: 0 auto 40px;
        text-align: center;
        font-weight: bold;
    }

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 5;
        border-radius: 10px;
        width: 400px;
        height: 400px;
        padding: 35px 35px 15px;
        margin: auto;
        background-color: rgba(45,58,75,0.8);
        @media (max-width:400px) {
            & {
                padding: 10px;
                width: calc(100% - 20px);
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .forget-pwd {
        color: #fff;
    }
}
</style>
