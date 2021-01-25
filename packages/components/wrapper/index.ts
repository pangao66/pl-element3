import { App } from 'vue'
// import type { SFCWithInstall } from 'element-plus/packages/utils/types'
import Wrapper from './wrapper.vue'

Wrapper.install = (app: App): void => {
  app.component(Wrapper.name, Wrapper)
}
export default Wrapper
