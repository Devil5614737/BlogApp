import React from 'react'
import { Form } from 'react-bootstrap'

export const SearchBox = ({query,setQuery}) => {
  return (
    <div className='mt-3'>
    <Form>
        <Form.Label style={{fontWeight:'bold'}}>Search</Form.Label>
        <Form.Control
        className='search-input'
        value={query} onChange={(e)=>setQuery(e.target.value)}/>
    </Form>
</div>
  )
}
