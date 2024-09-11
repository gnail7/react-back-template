import { useEffect, useState, useRef } from 'react'
import { getDictionaryEntries, getDictionarySelect, deleteRecordById, exportDictionaryToJSON, saveDictionary } from '@/api/dictionaryServer'
import { useAntdTable, useRequest } from 'ahooks'
import { Input,
  Table,
  Button,
  Form,
  Select,
  Space,
  Popconfirm,
  Dropdown,
  message,
  Modal,
  Divider,
  Flex } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

const DictionaryModal = ({ dictionary, isModalOpen, setIsModalOpen, type, languageCodes, entityTypeOption, reset }) => {
  const [modalForm] = Form.useForm()
  const { run } = useRequest(saveDictionary, {
    manual: true,
    onSuccess: () => {
      reset()
      message.success(`${type} Success`)
    },
  })
  const handleOk = () => {
    modalForm.validateFields().then((values) => {
      const params = {
        translation: values.translation,
        languageCode: values.languageCode,
        entityType: values.entityType,
        entityKey: values.entityKey,
      }
      run(params)
      setIsModalOpen(false)
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const initDictionaryKeyByType = (key) => {
    if (type === 'Edit') {
      return dictionary[key]
    }

    return null
  }
  useEffect(() => {
    if (dictionary) {
      modalForm.setFieldsValue({
        translation: initDictionaryKeyByType('translation'),
        languageCode: initDictionaryKeyByType('languageCode'),
        entityType: initDictionaryKeyByType('entityType'),
        entityKey: initDictionaryKeyByType('entityKey'),
      })
    }
  }, [dictionary.translation, dictionary.entityType, type])

  return (
    <Modal forceRender title={`${type} dictionary`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Divider />
      <Form
        form={modalForm}
        layout="vertical"
      >
        <Form.Item label="Language Code" name="languageCode" required>
          <Select
            placeholder="Please select language code"
            showSearch
            options={languageCodes}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Entity Type" name="entityType" required>
          <Select
            placeholder="Please select entity type"
            showSearch
            options={entityTypeOption}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Entity Key" name="entityKey" required>
          <Input placeholder="Please input entity key" />
        </Form.Item>
        <Form.Item label="Translation" name="translation" required>
          <Input placeholder="Please input translation" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default function InternationalDireManagement() {
  const [form] = Form.useForm()
  const [languageCodes, setLanguageCodes] = useState([])
  const [entityTypeOption, setEntityTypeOption] = useState([])

  // 分页获取表单数据
  const { tableProps, search, loading } = useAntdTable(
    ({ current, pageSize }, formData) => {
      return getDictionaryEntries({
        page: current,
        pageSize,
        ...formData,
      }).then((res) => res.data.data)
    },
    {
      form,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '50'], // 指定每页数据条数的选项
        defaultPageSize: 10, // 默认每页显示10条
        showSizeChanger: true, // 显示每页条数选择器
      },
    },
  )

  // 获取表头筛选条件
  const { run } = useRequest(getDictionarySelect, {
    manual: true,
    onSuccess: (res) => {
      if (res.data.success) {
        const { entityTypes, languageCodes } = res.data
        setLanguageCodes([...languageCodes.map((val) => ({ label: val, value: val }))])
        setEntityTypeOption([...entityTypes.map((val) => ({ label: val, value: val }))])
      }
    },
  })
  const dropdownMenu = [
    {
      label: 'Add',
      key: 'add',
    },
    {
      label: 'Export EN JSON data',
      key: 'exportEN',
    },
    {
      label: 'Export ZH JSON data',
      key: 'exportZH',
    },
  ]
  const { submit, reset } = search

  // ====== Table部分 ======
  const { run: deleteOption } = useRequest(deleteRecordById, {
    manual: true,
    onSuccess: () => {
      message.success('Delete success')
      submit()
    },
  })
  const handleDelete = (record) => {
    deleteOption({ dictionaryId: record.dictionaryId })
  }
  const handleEdit = (record) => {
    currentDictionary.current = record
    dictionaryOperate.current = 'Edit'
    setIsModalOpen(true)
  }

  const columns = [
    {
      title: 'Dictionary Id',
      dataIndex: 'dictionaryId',
    },
    {
      title: 'Entity Key',
      dataIndex: 'entityKey',
    },
    {
      title: 'Entity Type',
      dataIndex: 'entityType',
    },
    {
      title: 'Language Code',
      dataIndex: 'languageCode',
    },
    {
      title: 'Translation',
      dataIndex: 'translation',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            Edit
          </a>
          <Popconfirm title="Delete the record?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // ===== 表单Modal部分 =====
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dictionaryOperate = useRef('Edit')
  const currentDictionary = useRef({})
  useEffect(() => {
    run()
  }, [])

  // 定义搜索表单
  const handleDrodown = ({ key }) => {
    if (key === 'add') {
      dictionaryOperate.current = 'Add'
      setIsModalOpen(true)
    } else {
      exportDictionaryToJSON({ languageCode: key === 'exportEN' ? 'en' : 'zh' }).then((res) => {
        const { downloadUrl } = res.data
        if (downloadUrl) {
          const link = document.createElement('a')
          link.href = downloadUrl
          link.target = '_blank'
          link.click()
          link.remove()
        }
      })
    }
  }

  const searchForm = (
    <Form form={form} layout="inline" onFinish={submit}>
      <div className="w100-h100 search-box">
        <Flex>
          <Form.Item name="languageCode" label="Language Code">
            <Select
              placeholder="Select language code"
              showSearch
              options={languageCodes}
              allowClear
              style={{ width: 80 }}
            />
          </Form.Item>
          <Form.Item name="entityType" label="Entity Type">
            <Select
              placeholder="Select Entity Type"
              showSearch
              options={entityTypeOption}
              allowClear
              style={{ width: 80 }}
            />
          </Form.Item>
          <Form.Item name="translation" label="Translation">
            <Input placeholder="Enter translation" />
          </Form.Item>
        </Flex>
        <Form.Item className="search-box_right">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button onClick={reset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
          <Dropdown
            menu={{
              items: dropdownMenu,
              onClick: (key) => handleDrodown(key),
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <MoreOutlined className="cursor-pointer" />
            </a>
          </Dropdown>
        </Form.Item>
      </div>
    </Form>
  )

  return (
    <div className="container">
      {searchForm}
      <Table
        columns={columns}
        rowKey="dictionaryId"
        {...tableProps}
        loading={loading}
        className="mt"
      />
      <DictionaryModal
        dictionary={currentDictionary?.current}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type={dictionaryOperate.current}
        entityTypeOption={entityTypeOption}
        languageCodes={languageCodes}
        reset={reset}
      />
    </div>
  )
}
