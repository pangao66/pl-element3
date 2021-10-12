import { PlButton } from './pl-element/button/index'
import { PlInput } from "./pl-element/input";
import { PlSelect } from "./pl-element/select";
import { PlDate } from "./pl-element/date";
import { PlWrapper } from "./pl-element/wrapper";
import { PlForm, PlFormItem, PlSearchForm } from './pl-element/form/index'
import { PlTable, PlTableColumn } from './pl-element/table'
// export default PlButton
import { config } from '../common/config/install'
import { isObject } from '../common/utils/common'
import type { App } from 'vue'
import type { InstallOptions } from '../common/config/install'

const components = [
  PlButton,
  PlSelect,
  PlInput,
  PlDate,
  PlWrapper,
  PlForm,
  PlFormItem,
  PlSearchForm,
  PlTable,
  PlTableColumn
]
export const install = (
  app: App<unknown>,
  { prefix = '', ...options }: Partial<InstallOptions> & { prefix?: string } = {}
) => {
  config.defaults = { ...(options.defaults ?? {}) }

  Object.keys(options).forEach(key => {
    if (key !== 'defaults' && isObject(options[key])) {
      config[key] = { ...options[key] }
    }
  })

  components.forEach(component => {
    let name = component.name

    if (typeof prefix === 'string' && prefix.charAt(0).match(/[a-z]/)) {
      name = name.replace(/([A-Z])/g, '-$1').toLowerCase()
    }

    app.component(`${prefix}${name}`, component)
  })

  // plugins.forEach(plugin => {
  //   app.use(plugin)
  // })
}
export const version = '0.0.1'
export {
  PlButton,
  PlInput,
  PlSelect,
  PlDate,
  PlForm,
  PlFormItem,
  PlSearchForm,
  PlTable,
  PlTableColumn
}

export interface PlElementComponents {
  PlButton: typeof PlButton,
  PlInput: typeof PlInput,
  PlSelect: typeof PlSelect,
  PlWrapper: typeof PlWrapper,
  PlDate: typeof PlDate,
  PlForm: typeof PlForm,
  PlFormItem: typeof PlFormItem,
  PlSearchForm: typeof PlSearchForm,
  PlTable: typeof PlTable,
  PlTableColumn: typeof PlTableColumn
}
