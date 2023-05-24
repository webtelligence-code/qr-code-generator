import { Alert, Space } from 'antd'
import React from 'react'

const NoAccessWarning = ({ sessionData }) => {
  return (
    <Space
      direction='vertical'
      style={{ width: '100%', padding: 25, alignItems: 'center' }}
    >

      <Alert
        message={
          <h5 className='text-center'>
          O <strong>{sessionData.FUNCAO}</strong> do departamento <strong>{sessionData.DEPARTAMENTO}</strong> não tem acesso a esta plataforma. <br /> <br />
            Volte à <a href='https://amatoscar.pt/gap'>Página Inicial</a> para continuar. <br /> <br />
            Caso você tenha permissões de acesso à plataforma mas não tem acesso no momento, contacte o <strong>departamento informático</strong> <a href='mailto:informatica@amatoscar.pt'>informatica@amatoscar.pt</a>
          </h5>
        }
        type='error'
      />
      
    </Space>
  )
}

export default NoAccessWarning