import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    vnode: {
      type: [ Function, String, Object, Number ]
    }
  },
  setup(props) {
    if (typeof props.vnode === 'function') {
      // @ts-ignore
      return () => props.vnode()
    } else {
      return () => props.vnode
    }

  }
})
