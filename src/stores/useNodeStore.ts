import { defineStore } from 'pinia'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { getNodes } from '../utils/useConvertMarkdown'

export interface MindMapData {
  id: string
  type: 'topic' | 'topic-branch' | 'topic-child'
  label: string
  width?: number
  height?: number
  children?: MindMapData[]
  tools?: any[]
}

export const useNodeStore = defineStore('nodeStore', () => {
  const nodes = ref<MindMapData>()

  function generateNode(markdown: string) {
    const result = getNodes(markdown)
    if (result === undefined || result.length === 0) {
      message.info('There is no mindmap generated.')
      return
    }
    if (Array.isArray(result) && result.length > 0)
      nodes.value = result[0]
  }

  return {
    nodes,
    generateNode,
  }
})
