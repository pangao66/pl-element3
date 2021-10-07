import { ButtonProps, PopconfirmProps, ElMessageBoxOptions, ElTooltip } from 'element-plus'
import { PropType } from 'vue'

const props = {
  debounce: {
    type: Boolean,
  },
  autoLoading: {
    type: Boolean,
  },
  autoFullscreenLoading: {
    type: Boolean
  },
  confirmType: {
    type: String as PropType<'pop' | 'messagebox'>
  },
  popConfirmConfig: {
    type: Object as PropType<PopconfirmProps>
  },
  messageBoxConfig: {
    type: Object as PropType<ElMessageBoxOptions>
  },
  tipContent: {
    type: String
  },
  tipConfig: {
    type: Object
  }
}
