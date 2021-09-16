<script lang="ts" setup>
import { elFormEvents, elFormKey } from 'element-plus/lib/tokens'
import type { ElFormContext, ElFormItemContext as FormItemCtx, ValidateFieldCallback } from 'element-plus/lib/tokens'
import { inject, watch, ref } from "vue";


const emit = defineEmits<{
  (e: 'updateFields', val: FormItemCtx[]): void,
}>()
let fields = []
const elForm = inject(elFormKey, {} as ElFormContext)
elForm.formMitt.on<FormItemCtx>(elFormEvents.addField, field => {
  if (field) {
    fields.push(field)
    emit('updateFields', fields)
  }
})

elForm.formMitt.on<FormItemCtx>(elFormEvents.removeField, field => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
    emit('updateFields', fields)
  }
})
</script>
<script lang="ts">
export default {
  name: "form-get-fields"
}
</script>
