import request from '@/utils/request'

// 获取国际化字典类型列表
export const getDictionaryEntries = (data) => {
  return request({
    url: '/getDictionaryEntries',
    method: 'post',
    data,
  })
}

// 获取国际化字典语言列表
export const getDictionarySelect = (data) => {
  return request({
    url: '/getDictionarySelect',
    method: 'post',
    data,
  })
}

// 删除字典
export const deleteRecordById = (params) => request.post('/deleteRecordById', params)

// 导出国际化字典JSON数据
export const exportDictionaryToJSON = () => request.post('/exportDictionaryToJSON')

// 编辑/新增字典
export const saveDictionary = (params) => request.post('/saveDictionary', params)
