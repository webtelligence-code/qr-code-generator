import { Alert, Space } from 'antd'
import React from 'react'

const NoAccessWarning = ({ sessionDepartment }) => {
  return (
    <Space direction='vertical' style={{width: '100%', padding: 25, alignItems: 'center'}}>
      <Alert message={`O seu departamento "${sessionDepartment}" não tem acesso a esta plataforma.`} type='error' />
    </Space>
  )
}

export default NoAccessWarning