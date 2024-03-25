import { Col, Row } from "react-bootstrap";
import { InfoBox } from "../components/InfoBox";
import { BookmarkStarFill, TagsFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export const HomePage = () => {

  const urlApi = import.meta.env.VITE_API_URL;

  const [dashboardData, setDashboardData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${urlApi}dashboard`);
      const data = await response.json();
      setDashboardData(data.data);
    } catch (error) {
      console.error('Error fetching dashboard data: ', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Row className='justify-content-center mt-3'>
      <Col sm={12} md={3}>
        <InfoBox
          withIcon
          icon={<BookmarkStarFill />}
          iconColor='white'
          iconBg='success'
          title='Total Categories'
          content={dashboardData.category_count || 0}
        />
      </Col>
      <Col sm={12} md={3}>
        <InfoBox
          withIcon
          icon={<TagsFill />}
          iconColor='dark'
          iconBg='warning'
          title='Total Products'
          content={dashboardData.product_count || 0}
        />
      </Col>
    </Row>
  );
};