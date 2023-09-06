import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import Vue from 'vue'
// 设置表格高度
const doResize = async (el, binding, vnode) => {
  // 获取表格Dom对象
  const { componentInstance: $table } = await vnode
  // 获取调用传递过来的数据
  const { value } = binding
  if (!value.autoHeight) {
    return
  }
  if (!$table.height) {
    throw new Error("el-$table must set the height. Such as height='100px'")
  }
  // 获取距底部距离（用于展示页码等信息）
  const bottomOffset = (value && value.bottomOffset) || 30

  if (!$table) return

  // 计算列表高度并设置
  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  console.log(window.innerHeight)
  console.log(el.getBoundingClientRect().top)
  console.log(height)
  $table.layout.setHeight(height)
  $table.doLayout()
}
