import React from 'react'

const Filter = ({filter_todo}) => {
  return (
    
    <select className='filter-select' onChange={((e) => filter_todo(e.target.value))}>
            <option value={true}>Completadas</option>
            <option value={false}>Todas</option>
    </select>
    
  )
}

export default Filter