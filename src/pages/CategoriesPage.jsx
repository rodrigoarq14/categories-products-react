import { Button, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { BlockquoteLeft, BookmarkStarFill, Eye, Floppy2, PencilSquare, PlusCircle, Trash } from "react-bootstrap-icons";
import { TrCategory } from "../components/TrCategory";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { InfoBox } from "../components/InfoBox";
import { useFormEdit } from "../hooks/useFormEdit";

export const CategoriesPage = () => {

  const urlApi = import.meta.env.VITE_API_URL;

  const initalAddForm = {
    categoryName: '',
    categoryDescription: ''
  };

  const { categoryName, categoryDescription, onInputChange } = useForm(initalAddForm);
  const { formState, setInitialForm, onInputEditChange } = useFormEdit();
  
  const [categoryInfo, setCategoryInfo] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [categories, setCategories] = useState([]);

  // Operations with categories

  const handleAddCategory = async (data) => {
    try {
      const response = await fetch(`${urlApi}categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();
      
      const MySwal = withReactContent(Swal);
      
      if (response.ok) {
        await MySwal.fire({
          icon: 'success',
          title: responseData.message,
          showConfirmButton: false,
          timer: 2500
        });

        fetchCategoriesData();
        setShowAddModal(false);
      } else {
        const validationFields = Object.keys(responseData.data).map((key) => {
          return `${responseData.data[key]}`;
        }).join('<br>');

        await MySwal.fire({
          icon: 'error',
          title: responseData.message,
          didOpen: () => {
            MySwal.showValidationMessage(validationFields);
          }
        });
      }
      
    } catch (error) {
      console.error('An error occurred while adding a category:', error);
    }
  };

  const handleEditCategory = async (data) => {
    try {
      const response = await fetch(`${urlApi}categories/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      const MySwal = withReactContent(Swal);

      if (response.ok) {
        await MySwal.fire({
          icon: 'success',
          title: responseData.message,
          showConfirmButton: false,
          timer: 2500
        });

        fetchCategoriesData();
        setShowEditModal(false);
      } else {
        const validationFields = Object.keys(responseData.data).map((key) => {
          return `${responseData.data[key]}`;
        }).join('<br>');

        await MySwal.fire({
          icon: 'error',
          title: responseData.message,
          didOpen: () => {
            MySwal.showValidationMessage(validationFields);
          }
        });
      }
    } catch (error) {
      console.error('An error occurred while editing a category:', error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`${urlApi}categories/${categoryInfo.id}`, {
        method: 'DELETE'
      });

      const responseData = await response.json();

      const MySwal = withReactContent(Swal);

      if (response.ok) {
        await MySwal.fire({
          icon: 'success',
          title: responseData.message,
          showConfirmButton: false,
          timer: 2500
        });

        fetchCategoriesData();
        setShowDeleteModal(false);
      } else {
        await MySwal.fire({
          icon: 'error',
          title: responseData.message
        });
      }
    } catch (error) {
      console.error('An error occurred while deleting a category:', error);
    }
  };

  //--------------------------------------------------------------------------------

  // Modal handlers

  const handleShowCategoryInfo = (category) => {
    setCategoryInfo(category);
    setShowInfoModal(true);
  };

  const handleShowEditModal = (category) => {
    setCategoryInfo(category);
    setInitialForm({ categoryName: category.name, categoryDescription: category.description });
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (category) => {
    setCategoryInfo(category);
    setShowDeleteModal(true);
  };

  //--------------------------------------------------------------------------------

  // Form handlers

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleAddCategory({ name: categoryName, description: categoryDescription });
  };

  const handleSubmitEditCategory = (event) => {
    event.preventDefault();
    handleEditCategory({ id: categoryInfo.id, name: formState.categoryName, description: formState.categoryDescription });
  };

  //--------------------------------------------------------------------------------

  // Fetch categories from API
  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${urlApi}categories`);
      const data = await response.json();
      setCategories(data.data);
      console.log('Categories fetched:', data);
    } catch (error) {
      console.error('An error occurred while fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return (
    <>
      <Row>
        <h2>Categories</h2>
      </Row>
      <Row className='mt-3'>
        <Col className='d-flex justify-content-start'>
          <Button variant='outline-success' onClick={() => setShowAddModal(true)}>
            <PlusCircle className='ml-4 mb-1' />
            {' '}
            Add Category
          </Button>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Table striped hover responsive size="sm" className="align-middle">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              categories.map(category => (
                <TrCategory key={category.id} category={category} handleShowCategoryInfo={handleShowCategoryInfo} handleShowEditModal={handleShowEditModal} handleShowDeleteModal={handleShowDeleteModal} />
              ))
            }
          </tbody>
        </Table>
      </Row>
      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <PlusCircle className='mr-2 mb-1 text-success' />
            {' '}
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formCategoryName">
              <Form.Label>
                Category Name:
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className='bg-primary'>
                  <BookmarkStarFill />
                </InputGroup.Text>
                <Form.Control onChange={onInputChange} name="categoryName" type="text" placeholder="Enter category name" />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryDescription">
              <Form.Label>
                Category Description:
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className='bg-success'>
                  <BlockquoteLeft />
                </InputGroup.Text>
                <Form.Control onChange={onInputChange} as="textarea" name="categoryDescription" placeholder="Enter category description" />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ligth" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleOnSubmit}>
            <Floppy2 className='mr-2 mb-1' />
            {' '}
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Info Modal */}
      <Modal show={showInfoModal} onHide={() => setShowInfoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Eye className='mr-2 mb-1 text-info' />
            {' '}
            Category Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoBox withIcon={false} title='Category Name' content={categoryInfo.name} />
          <InfoBox withIcon={false} title='Category Description' content={categoryInfo.description} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ligth" onClick={() => setShowInfoModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <PencilSquare className='mr-2 mb-1 text-warning' />
            {' '}
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCategory}>
            <Form.Group className="mb-3" controlId="formCategoryName">
              <Form.Label>
                Category Name:
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className='bg-primary'>
                  <BookmarkStarFill />
                </InputGroup.Text>
                <Form.Control value={formState.categoryName} onChange={onInputEditChange} name="categoryName" type="text" placeholder="Enter category name" />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryDescription">
              <Form.Label>
                Category Description:
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className='bg-success'>
                  <BlockquoteLeft />
                </InputGroup.Text>
                <Form.Control value={formState.categoryDescription} onChange={onInputEditChange} as="textarea" name="categoryDescription" placeholder="Enter category description" />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ligth" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSubmitEditCategory}>
            <Floppy2 className='mr-2 mb-1' />
            {' '}
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Delete */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Trash className='mr-2 mb-1 text-danger' />
            {' '}
            Delete Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this category?</p>
          <p className="text-danger text-decoration-underline">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ligth" onClick={() => setShowDeleteModal(false)}>Close</Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            <Trash className='mr-2 mb-1' />
            {' '}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
