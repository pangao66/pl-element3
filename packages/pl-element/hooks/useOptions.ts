import { computed } from "vue";
import { isPlainObject } from "lodash-es";

type OriginOption = any[] | Record<string | number, any>
type OptionItem = { label: string, value: string | number | boolean | Record<string | number, any>, key: string | number | boolean, disabled?: boolean }

interface UseOptionsProps {
  labelKey?: string
  valueKey?: string
  isBindObject?: boolean
}

export function useOptions(options: OriginOption, config?: UseOptionsProps) {
  const { labelKey = 'label', valueKey = 'value', isBindObject = false } = config || {}
  const calOptions = computed<OptionItem[]>(() => {
    let newOptions: OptionItem[] = []
    if (isPlainObject(options)) {
      return Object.entries(options as Record<string, any>).map(([ key, value ]) => ({
        label: value, value: key, key: key
      }))
    }
    ((options || []) as any[]).forEach((item) => {
      if (typeof item === 'string') {
        newOptions.push({ label: item, value: item, key: item })
      } else {
        newOptions.push({
          label: item[labelKey],
          value: isBindObject ? item : item[valueKey],
          key: item[valueKey],
          disabled: item?.disabled
        })
      }
    })
    return newOptions
  })

  // 通过value值 反查label
  function useOptionsMap(value: string | number | boolean) {
    const item = calOptions.value.find((item) => {
      // @ts-ignore
      return value === (isBindObject ? item.value[valueKey] : item.value)
    })
    if (isBindObject) {
      return item?.value
    }
    return item?.label
  }

  return {
    options: calOptions,
    useOptionsMap
  }
}
