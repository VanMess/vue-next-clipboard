import { ref, Ref, watch, onUnmounted } from 'vue'
import { readText, writeText } from 'clipboard-polyfill'

const warn = console.warn
// Sharing between instances
type RefClipdata = Ref<string> | Ref<null>
const clipdata = <RefClipdata>ref(null)

const useTimes = ref(0)

function copyHandler() {
  asyncClipboardData()
}

watch(
  () => useTimes.value,
  (v1, v2) => {
    if (v1 === 0) {
      document.removeEventListener('copy', copyHandler)
      document.removeEventListener('cut', copyHandler)
    } else if (v1 > 0 && v2 === 0) {
      document.addEventListener('copy', copyHandler)
      document.addEventListener('cut', copyHandler)
    }
  }
)

function asyncClipboardData() {
  return readText()
    .then((v) => {
      clipdata.value = v
    })
    .catch(warn)
}

export function useClipboard() {
  asyncClipboardData()
  useTimes.value++
  onUnmounted(() => {
    useTimes.value--
  })
  return {
    clipdata,
    writeText(v: string) {
      clipdata.value = v
      return writeText(v)
    },
  }
}
