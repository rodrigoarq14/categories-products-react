import { Button, Col, Row, Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { TrProduct } from "../components/TrProduct";

export const ProductsPage = () => {
  return (
    <>
      <Row>
        <h2>Products</h2>
      </Row>

      <Row className='mt-3'>
        <Col className='d-flex justify-content-start'>
          <Button variant='outline-success'>
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
            <TrProduct name={'Product 1'} category={'Category 1'} />
            <TrProduct name={'Product 2'} category={'Category 2'} />
            <TrProduct name={'Product 3'} category={'Category 3'} />
            <TrProduct name={'Product 4'} category={'Category 4'} />
            <TrProduct name={'Product 5'} category={'Category 5'} />
          </tbody>
        </Table>
      </Row>
    </>
  );
};
