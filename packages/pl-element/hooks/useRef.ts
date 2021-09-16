import { ref } from 'vue'

export function useRef() {
  const container = ref()

  return { container }
}
