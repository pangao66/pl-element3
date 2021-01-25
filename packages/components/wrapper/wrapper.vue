<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlWrapper',
  setup (props, { slots }) {
    console.log(slots)
    return () => slots && slots?.default?.()
  }
})
</script>

<style>

</style>
