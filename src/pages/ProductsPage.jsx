import { Button, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { ArchiveFill, BlockquoteLeft, BookmarkStarFill, CashCoin, Eye, Floppy2, PlusCircle, TagFill, Trash } from "react-bootstrap-icons";
import { TrProduct } from "../components/TrProduct";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { InfoBox } from "../components/InfoBox";
import { useFormEdit } from "../hooks/useFormEdit";

export const ProductsPage = () => {

  const urlApi = import.meta.env.VITE_API_URL;

  const initiaAddForm = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
    productCategoryId: null
  };

  const { productName, productDescription, productPrice, productStock, productCategoryId, onInputChange } = useForm(initiaAddForm);
  const { formState, setInitialForm, onInputEditChange } = useFormEdit();


  const [productInfo, setProductInfo] = useState({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Operations with products (CRUD) - (API)

  const handleAddProduct = async (data) => {
    try {
      const response = await fetch(`${urlApi}products`, {
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

        featchProductsData();
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
      console.error('An error occurred while trying to add a product:', error);
    }
  };

  const handleEditProduct = async (data) => {
    try {
      const response = await fetch(`${urlApi}products/${data.id}`, {
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

        featchProductsData();
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
      console.error('An error occurred while trying to edit a product:', error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`${urlApi}products/${productInfo.id}`, {
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

        featchProductsData();
        setShowDeleteModal(false);
      } else {
        await MySwal.fire({
          icon: 'error',
          title: responseData.message
        });
      }

    } catch (error) {
      console.error('An error occurred while trying to delete a product:', error);
    }
  };

  const featchProductsData = async () => {
    try {
      const response = await fetch(`${urlApi}products`);
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${urlApi}categories`);
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('An error occurred while fetching categories:', error);
    }
  };

  // Modal Handlers

  const handleShowProductInfo = async (product) => {
    setProductInfo(product);
    setShowInfoModal(true);
  };

  const handleShowProductEdit = async (product) => {
    setProductInfo(product);
    setInitialForm({ productName: product.name, productDescription: product.description, productPrice: product.price, productStock: product.stock, productCategoryId: product.category_id})
    setShowEditModal(true);
  };

  const handleShowProductDelete = async (product) => {
    setProductInfo(product);
    setShowDeleteModal(true);
  };

  // Form Handlers

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    handleAddProduct({ name: productName, description: productDescription, price: productPrice, stock: productStock, category_id: productCategoryId });
  };

  const handleSubmitEditProduct = async (event) => {
    event.preventDefault();
    handleEditProduct({ id: productInfo.id, name: formState.productName, description: formState.productDescription, price: formState.productPrice, stock: formState.productStock, category_id: formState.productCategoryId });
  };

  useEffect(() => {
    featchProductsData();
    fetchCategoriesData();
  }, []);

  return (
    <>
      <Row>
        <h2>Products</h2>
      </Row>
      <Row className='mt-3'>
        <Col className='d-flex justify-content-start'>
          <Button variant='outline-success' onClick={() => setShowAddModal(true)}>
            <PlusCircle className='ml-4 mb-1' />
            {' '}
            Add Product
          </Button>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Table striped hover responsive size="sm" className="align-middle">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              products.map((product) => (
                <TrProduct key={product.id} product={product} handleShowProductInfo={handleShowProductInfo} handleShowProductEdit={handleShowProductEdit} handleShowProductDelete={handleShowProductDelete} />
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
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-primary">
                  <TagFill />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Enter product name" name="productName" value={productName} onChange={onInputChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-success">
                  <BlockquoteLeft />
                </InputGroup.Text>
                <Form.Control as="textarea" placeholder="Enter product description" name="productDescription" value={productDescription} onChange={onInputChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-warning text-dark">
                  <CashCoin />
                </InputGroup.Text>
                <Form.Control type="number" placeholder="Enter product price" name="productPrice" value={productPrice} onChange={onInputChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productStock">
              <Form.Label>Product Stock</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-info text-dark">
                  <ArchiveFill />
                </InputGroup.Text>
                <Form.Control type="number" placeholder="Enter product stock" name="productStock" value={productStock} onChange={onInputChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productCategoryId">
              <Form.Label>Product Category</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-dark">
                  <BookmarkStarFill />
                </InputGroup.Text>
                <Form.Select name="productCategoryId" value={productCategoryId} onChange={onInputChange}>
                  <option value="">Select a category</option>
                  {
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
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
            Product Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InfoBox withIcon={false} title='Product Name' content={productInfo.name} />
          <InfoBox withIcon={false} title='Product Description' content={productInfo.description} />
          <InfoBox withIcon={false} title='Product Price' content={productInfo.price} />
          <InfoBox withIcon={false} title='Product Stock' content={productInfo.stock} />
          <InfoBox withIcon={false} title='Product Category' content={productInfo.category_name} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => setShowInfoModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Eye className='mr-2 mb-1 text-info' />
            {' '}
            Product Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-primary">
                  <TagFill />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Enter product name" name="productName" value={formState.productName} onChange={onInputEditChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-success">
                  <BlockquoteLeft />
                </InputGroup.Text>
                <Form.Control as="textarea" placeholder="Enter product description" name="productDescription" value={formState.productDescription} onChange={onInputEditChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-warning text-dark">
                  <CashCoin />
                </InputGroup.Text>
                <Form.Control type="number" placeholder="Enter product price" name="productPrice" value={formState.productPrice} onChange={onInputEditChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productStock">
              <Form.Label>Product Stock</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-info text-dark">
                  <ArchiveFill />
                </InputGroup.Text>
                <Form.Control type="number" placeholder="Enter product stock" name="productStock" value={formState.productStock} onChange={onInputEditChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="productCategoryId">
              <Form.Label>Product Category</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-dark">
                  <BookmarkStarFill />
                </InputGroup.Text>
                <Form.Select name="productCategoryId" value={formState.productCategoryId} onChange={onInputEditChange}>
                  <option value="">Select a category</option>
                  {
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSubmitEditProduct}>
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
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?  </p>
          <p className="text-danger text-decoration-underline">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => setShowDeleteModal(false)}>Close</Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            <Trash className='mr-2 mb-1' />
            {' '}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
