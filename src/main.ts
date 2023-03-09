// 导入vue
import { createApp } from 'vue'
// 导入UI库
import ViewUIPlus from 'view-ui-plus'
// 导入根组件
import App from './App.vue'
// 导入路由配置
import router from './router'

// 导入样式文件
import 'view-ui-plus/dist/styles/viewuiplus.css'

// import './assets/main.css'

createApp(App)
.use(ViewUIPlus)
.use(router)
.mount('#app')
