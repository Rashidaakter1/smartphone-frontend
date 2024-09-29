import React, { useState } from 'react';
import { useDeleteProductMutation, useGetProductQuery } from "../../redux/features/product/productApi";
import { Table, Typography, Tag, Skeleton, Button, Space, Grid, Popconfirm } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProductModal from "./AddProductModal";
import { toast } from 'sonner';
import EditProductModal from './EditProductModal';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Product: React.FC = () => {
    const { data, isLoading, error } = useGetProductQuery(undefined);
    const [removeProduct] = useDeleteProductMutation()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productId, setProductId] = useState("");
    const [isEditModalVisible, setEditIsModalVisible] = useState(false);
    const screens = useBreakpoint();

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("please wait for a sec ...")
        try {
            await removeProduct(id)
            toast.success("product deleted successfully", { id: toastId, duration: 2000 })
        } catch (error) {
            toast.error("Failed to delete", { id: toastId, duration: 2000 })
        }

    };

    const handleEdit = (id: string) => {
        setProductId(id)
        setEditIsModalVisible(true)
    };

    if (isLoading) {
        return <Skeleton active />;
    }

    if (error) {
        return <div>Error loading products</div>;
    }

    const renderBooleanFeature = (flag: boolean) => (
        flag ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
    );

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: "left",
            render: (text: string) => <a>{text}</a>,

        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <Text strong>${price}</Text>,

        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number) => <Text strong>{quantity}</Text>,

        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            render: (releaseDate: Date) => <Text strong>{new Date(releaseDate).toLocaleDateString()}</Text>,

        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',

        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',

        },
        {
            title: 'OS',
            dataIndex: 'operatingSystem',
            key: 'operatingSystem',
            render: (os: string) => <Tag color="blue">{os}</Tag>,

        },
        {
            title: 'Screen',
            dataIndex: 'screenSize',
            key: 'screenSize',
            render: (size: number) => (
                <Space>

                    {size}"
                </Space>
            ),

        },
        {
            title: 'Storage',
            dataIndex: 'storageCapacity',
            key: 'storageCapacity',
            render: (capacity: number) => (
                <Space>

                    {capacity}GB
                </Space>
            ),

        },
        {
            title: 'Camera',
            dataIndex: 'cameraQuality',
            key: 'cameraQuality',
            render: (camera: { main: number, front: number }) => (
                <Space direction="vertical">
                    <Space>
                        Main: {camera.main} MP
                    </Space>
                    <Space>
                        Front: {camera.front} MP
                    </Space>
                </Space>
            ),
            responsive: ['lg'],
        },
        {
            title: 'Battery',
            dataIndex: 'batteryCapacity',
            key: 'batteryCapacity',
            render: (capacity: number) => (
                <Space>

                    {capacity}mAh
                </Space>
            ),

        },
        {
            title: 'Additional Features',
            dataIndex: 'additionalFeatures',
            key: 'additionalFeatures',
            render: (features: { isWaterResistant: boolean; has5G: boolean; hasWirelessCharging: boolean }) => (
                <Space direction="vertical">
                    <Space>
                        Water Resistant: {renderBooleanFeature(features.isWaterResistant)}
                    </Space>
                    <Space>
                        5G: {renderBooleanFeature(features.has5G)}
                    </Space>
                    <Space>
                        Wireless Charging: {renderBooleanFeature(features.hasWirelessCharging)}
                    </Space>
                </Space>
            ),

        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: "right",
            render: (record: any) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record._id)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),

        },
    ];

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Title level={2}>Products</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                        Add Product
                    </Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={data?.data}
                    rowKey="id"
                    scroll={screens.xs ? { x: 800 } : { x: 'max-content' }}
                    pagination={{ pageSize: 10 }}
                    size={screens.xs ? 'small' : 'middle'}
                />
            </Space>
            <AddProductModal
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);

                }}
                onOk={() => {
                    setIsModalVisible(false);
                }}
            />
            <EditProductModal
                productId={productId}
                visible={isEditModalVisible}
                onCancel={() => {
                    setEditIsModalVisible(false);

                }}
                onOk={() => {
                    setEditIsModalVisible(false);
                }}
            />
        </>
    );
};

export default Product;
