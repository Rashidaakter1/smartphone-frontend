import { useGetProductQuery } from "../../redux/features/product/productApi"
import React, { useState } from 'react';
import { Card, Col, Row, Typography, Tag, Skeleton, Button } from 'antd';
import { MobileOutlined, MoreOutlined, CameraOutlined, BarsOutlined, PlusOutlined } from '@ant-design/icons';
import AddProductModal from "./AddProductModal";
const { Title, Text } = Typography;

const Product: React.FC = () => {
    const { data, isLoading, error } = useGetProductQuery(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(data)
    if (isLoading) {
        return <Skeleton active />;
    }

    if (error) {
        return <div>Error loading products</div>;
    }

    return (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Title level={2}>Products</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    Add Product
                </Button>
            </Row>
            <Row gutter={[16, 16]}>
                {data?.data?.map((product: any) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={`https://via.placeholder.com/300x200?text=${product.name}`} />}
                        >
                            <Title level={4}>{product.name}</Title>
                            <Text strong>${product.price}</Text>
                            <Text type="secondary" style={{ display: 'block', margin: '8px 0' }}>
                                {product.brand} - {product.model}
                            </Text>
                            <Tag color="blue">{product.operatingSystem}</Tag>
                            <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                                <Col span={12}>
                                    <MobileOutlined /> {product.screenSize}"
                                </Col>
                                <Col span={12}>
                                    <MoreOutlined /> {product.storageCapacity}GB
                                </Col>
                                <Col span={12}>
                                    <CameraOutlined /> {product.cameraQuality.main}MP
                                </Col>
                                <Col span={12}>
                                    <BarsOutlined /> {product.batteryCapacity}mAh
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
            <AddProductModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => {
                    // Handle adding product logic here
                    setIsModalVisible(false);
                }}
            />
        </>
    );
};

export default Product;


