import axios from 'axios'
import {Button, Modal} from 'react-bootstrap'
import React,{useState} from 'react'
function DeleteCategory(props){
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const token = localStorage.getItem('Estate');
    try{
      await axios.delete(`http://localhost:7000/api/v1/category/deleteCategory?category_id=${props.category.category_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      props.handleCategoryDelete(props.category.category_id)
    }catch(error){
      console.log(error);
    }
  }

  return(
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={props.handleClose} variant='primary'>Cancle</Button>
          <Button className='m-1' onClick={handleDelete} variant='danger' >Delete</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeleteCategory;