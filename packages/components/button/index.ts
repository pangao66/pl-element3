import { App } from 'vue'
// import type { SFCWithInstall } from 'element-plus/packages/utils/types'
import Button from './button.vue'

Button.install = (app: App): void => {
  app.component(Button.name, Button)
}
export default Button
