import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    vnode: {
      type: [ Function, String, Object, Number ]
    },
    data: {
      type: [ Array, Object, String, Number, Function ]
    }
  },
  setup(props) {
    if (typeof props.vnode === 'function') {
      // @ts-ignore
      return () => props.vnode(props.data)
    } else {
      return () => props.vnode
    }
  }
})
