

import React, { useEffect } from 'react';
import { Modal, Input, InputNumber, Select, DatePicker, Checkbox, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useCreateProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from '../../redux/features/product/productApi';
import { toast } from 'sonner';
import { AddProductModalProps } from './AddProductModal';
import moment from 'moment';


const { Option } = Select;

const EditProductModal: React.FC<AddProductModalProps> = ({ visible, onCancel, onOk, productId }) => {
    const { data } = useGetProductByIdQuery(productId)
const [updateProduct]=useUpdateProductMutation()
    const product = data?.data
    const { control, handleSubmit, reset } = useForm();
   

    useEffect(() => {
       
        if (product) {
            reset({
                name: product.name,
                price: product.price,
                brand: product.brand,
                model: product.model,
                storageCapacity: product.storageCapacity,
                mainCameraQuality: product.cameraQuality?.main,
                frontCameraQuality: product.cameraQuality?.front,
                quantity: product.quantity,
                releaseDate: product.releaseDate ? moment(product.releaseDate) : null,
                operatingSystem: product.operatingSystem,
                screenSize: product.screenSize,
                batteryCapacity: product.batteryCapacity,
                isWaterResistant: product.additionalFeatures?.isWaterResistant,
                has5G: product.additionalFeatures?.has5G,
                hasWirelessCharging: product.additionalFeatures?.hasWirelessCharging,
            });
        }
    }, [product, reset]);

    const onSubmit = async (data: any) => {
        const toastId = toast.loading('product is updating...');
        try {
            const formattedData = {
                ...data,
                releaseDate: data.releaseDate ? data.releaseDate.format('YYYY-MM-DD') : null,
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
            const updatedProductData ={
                id:productId,
                body:formattedData
            }
            const res = await updateProduct(updatedProductData)
            if (res?.data) {
                toast.success("Product updated successfully", { id: toastId, duration: 2000 })
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

            title="Edit Product"
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
                            defaultValue={product?.name}
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
                            defaultValue={product?.price}
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
                            defaultValue={product?.brand}
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
                            defaultValue={product?.model}
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
                            defaultValue={product?.storageCapacity}
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
                            defaultValue={product?.cameraQuality?.main}
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
                            defaultValue={product?.cameraQuality?.front}
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
                            defaultValue={product?.quantity}
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
                            defaultValue={product?.releaseDate}
                            control={control}
                            rules={{ required: 'releaseDate is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label>releaseDate</label>
                                    <DatePicker
                                        {...field}
                                        value={field.value ? moment(field.value) : null}
                                        style={{ width: '100%' }}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        />
                        <Controller
                            name="operatingSystem"
                            defaultValue={product?.operatingSystem}
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
                            defaultValue={product?.screenSize}
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
                            defaultValue={product?.batteryCapacity}
                            control={control}
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
                                    defaultValue={product?.additionalFeatures?.isWaterResistant}
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
                                    defaultValue={product?.additionalFeatures?.has5G}
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
                                    defaultValue={product?.additionalFeatures?.hasWirelessCharging}
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
    )
}

export default EditProductModal