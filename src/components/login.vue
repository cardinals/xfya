<template>
	<div id='index'>
		<div class='container'>
			<img src='/static/img/form.png'>
			<div class='ipanel'>
				<input id='username' value='' v-model='username'><br>
				<input type='password' id='password' value='' v-model='password'>
				<div class='btn-login' @click='login'></div>
				<input class='error-login' v-model='msg' />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			username: 'admin',
			password: 'admin',
			msg: '',
		};
	},
	mounted () {
		this.keyUp();
	},
	methods: {
		keyUp () {
			document.onkeydown = (e) => {
				if (e.keyCode === 13) {
					this.login();
				}
			};
		},
		login: function (e) {
			if (this.username === '' || this.password === '') {
				this.msg = '请输入用户名和密码';
			} else {
				let data = {
					'username': this.username,
					'password': this.password,
				};
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)',
				});
				plan.remote.ajaxPost(`${BASE_URL}/user/login`, JSON.stringify(data), (back) => {
					// 响应成功回调
					this.$cookieStore.setCookie('loginName', back.result.username, 1);
					this.$cookieStore.setCookie('loginToken', back.result.token, 1);
					setTimeout(() => {
						loading.close();
						this.$router.push('/');
					}, 1000);
				});
			};
		},
	},
};
</script>

<style lang='scss' scoped>
	#index{
		position: absolute;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background-image: url('/static/img/bg.jpg');
		overflow: hidden;
		background-size: cover;
	}
	.container {
		right: 50px;
		position: absolute;
		width: 375px;
		height: 670px;
		img {
			display: block;
			max-width: 100%;
			height: auto;
			margin:0 auto;
		}
		.ipanel {
			width: 160px;
			margin: auto;
			margin-top: -220px;
			padding-left: 40px;
		}
		input {
			background-color: transparent;
			color: white;
			outline: none;
			border: 0;
			width:100%;
			margin: 0 5px;
			&:first-child {
				padding-bottom: 29px;
			}
		}
		.btn-login {
			position: relative;
			cursor: pointer;
			width: 60%;
			margin-left: 40%;
			height: 41px;
			margin-top: 17px;
		}
		.error-login {
			margin-top: 15px;
			color: red;
			text-align: left;
		}
	}
</style>
