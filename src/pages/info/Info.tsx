import React from 'react'
import withPermission from '../../utils/HOC/withPermission'

const Info = () => {
  return (
    <div>Info</div>
  )
}

export default withPermission(['customer']) (Info)