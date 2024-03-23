import { Col, Row } from "react-bootstrap";
import { InfoBox } from "../components/InfoBox";
import { BookmarkStarFill, TagsFill } from "react-bootstrap-icons";

export const HomePage = () => {
  return (
    <Row className='justify-content-center mt-3'>
      <Col sm={12} md={3}>
        <InfoBox
          withIcon
          icon={<BookmarkStarFill />}
          iconColor='white'
          iconBg='success'
          title='Total Categories'
          content='10'
        />
      </Col>
      <Col sm={12} md={3}>
        <InfoBox
          withIcon
          icon={<TagsFill />}
          iconColor='dark'
          iconBg='warning'
          title='Total Products'
          content='10'
        />
      </Col>
    </Row>
  );
};