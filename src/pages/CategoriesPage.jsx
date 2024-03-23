import { Button, Col, Row, Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { TrCategory } from "../components/TrCategory";

export const CategoriesPage = () => {
  return (
    <>
      <Row>
        <h2>Categories</h2>
      </Row>
      <Row className='mt-3'>
        <Col className='d-flex justify-content-start'>
          <Button variant='outline-success'>
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
          <tbody>
            <TrCategory name={'Categoria 1'} />
            <TrCategory name={'Categoria 2'} />
            <TrCategory name={'Categoria 3'} />
            <TrCategory name={'Categoria 4'} />
            <TrCategory name={'Categoria 5'} />
          </tbody>
        </Table>
      </Row>
    </>
  );
};
