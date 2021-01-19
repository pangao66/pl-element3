import type { App } from 'vue'
import PlButton from './components/button/index'

const components = [
  PlButton
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
  install
}

export default {
  // version,
  install
}
