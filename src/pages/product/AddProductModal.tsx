import React from 'react';
import { Modal, Input, InputNumber, Select, DatePicker, Checkbox, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useCreateProductMutation } from '../../redux/features/product/productApi';
import { toast } from 'sonner';

const { Option } = Select;

export interface AddProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
    productId?: string
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onCancel, onOk }) => {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: 'Iphone  pro max',
            price: 999,
            brand: 'Apple',
            model: 'iPhone',
            quantity: 12,
            releaseDate: "",
            operatingSystem: 'ios',
            screenSize: 6.1,
            storageCapacity: 128,
            batteryCapacity: 3000,
            mainCameraQuality: 12,
            frontCameraQuality: 12,
            isWaterResistant: true,
            has5G: true,
            hasWirelessCharging: true
        }
    });
    const [addProduct] = useCreateProductMutation()

    const onSubmit = async (data: any) => {
        const toastId = toast.loading('product is adding...');
        try {
            const formattedData = {
                ...data,
                cameraQuality: {
                    main: data.mainCameraQuality,
                    front: data.frontCameraQuality
                },
                additionalFeatures: {
                    isWaterResistant: data.isWaterResistant,
                    has5G: data.has5G,
                    hasWirelessCharging: data.hasWirelessCharging
                }
            };

            // Remove the individual camera and feature fields
            delete formattedData.mainCameraQuality;
            delete formattedData.frontCameraQuality;
            delete formattedData.isWaterResistant;
            delete formattedData.has5G;
            delete formattedData.hasWirelessCharging;

            console.log(formattedData);
            const res = await addProduct(formattedData)
            if (res?.data) {
                toast.success("Product added successfully", { id: toastId, duration: 2000 })
            }

            console.log(res)
            onOk(formattedData);
            reset();
        }
        catch (error) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }

    };

    return (
        <Modal

            title="Add New Product"
            visible={visible}
            onCancel={onCancel}
            onOk={handleSubmit(onSubmit)}
        >
            <form>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Product Name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Product Name</label>
                                    <Input {...field} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: 'Price is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Price</label>
                                    <InputNumber
                                        {...field}
                                        prefix="$"
                                        style={{ width: '100%' }}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <Controller
                            name="brand"
                            control={control}
                            rules={{ required: 'Brand is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Brand</label>
                                    <Input {...field} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />

                        <Controller
                            name="model"
                            control={control}
                            rules={{ required: 'Model is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Model</label>
                                    <Input {...field} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />

                        <Controller
                            name="storageCapacity"
                            control={control}
                            rules={{ required: 'Storage Capacity is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Storage Capacity (GB)</label>
                                    <InputNumber {...field} style={{ width: '100%' }} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />

                        <Controller
                            name="mainCameraQuality"
                            control={control}
                            rules={{ required: 'Main Camera Quality is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Main Camera Quality (MP)</label>
                                    <InputNumber {...field} style={{ width: '100%' }} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />

                        <Controller
                            name="frontCameraQuality"
                            control={control}
                            rules={{ required: 'Front Camera Quality is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Front Camera Quality (MP)</label>
                                    <InputNumber {...field} style={{ width: '100%' }} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Controller
                            name="quantity"
                            control={control}
                            rules={{ required: 'quantity is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>quantity</label>
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <Controller
                            name="releaseDate"
                            control={control}
                            rules={{ required: 'releaseDate is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>releaseDate</label>
                                    <DatePicker
                                        {...field}
                                        style={{ width: '100%' }}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <Controller
                            name="operatingSystem"
                            control={control}
                            rules={{ required: 'Operating System is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Operating System</label>
                                    <Select {...field} style={{ width: '100%' }}>
                                        <Option value="ios">iOS</Option>
                                        <Option value="android">Android</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />

                        <Controller
                            name="screenSize"
                            control={control}
                            rules={{ required: 'Screen Size is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Screen Size (inches)</label>
                                    <InputNumber {...field} style={{ width: '100%' }} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <Controller
                            name="batteryCapacity"
                            control=

                            {control}
                            rules={{ required: 'Battery Capacity is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>Battery Capacity (mAh)</label>
                                    <InputNumber {...field} style={{ width: '100%' }} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <div style={{ marginBottom: 16 }}>
                            <label>Additional Features</label>
                            <div>
                                <Controller
                                    name="isWaterResistant"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value}>
                                            Water Resistant
                                        </Checkbox>
                                    )}
                                />
                            </div>
                            <div>
                                <Controller
                                    name="has5G"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value}>
                                            5G Capable
                                        </Checkbox>
                                    )}
                                />
                            </div>
                            <div>
                                <Controller
                                    name="hasWirelessCharging"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value}>
                                            Wireless Charging
                                        </Checkbox>
                                    )}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>









            </form>
        </Modal>
    );
};

export default AddProductModal;