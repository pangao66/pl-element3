import type { App } from 'vue'
import PlButton from './components/button/index'
import PlWrapper from './components/wrapper'

const components = [
  PlButton,
  PlWrapper
]
// const install = {
//   install: function (app: App, opts = {}) {
//     components.forEach(component => {
//       app.component(component.name, component)
//     })
//   }
// }
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}
// export { utils }
export {
  PlButton,
  PlWrapper,
  install
}

export default {
  // version,
  install
}
