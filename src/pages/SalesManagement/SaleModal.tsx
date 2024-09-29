
import React, { useEffect } from 'react';
import { Modal, Input, InputNumber, DatePicker, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useGetProductByIdQuery } from '../../redux/features/product/productApi';
import { toast } from 'sonner';
import moment from 'moment';
import { AddProductModalProps } from '../product/AddProductModal';
import { useCreateSalesMutation } from '../../redux/features/sales/salesApi';




const SaleModal: React.FC<AddProductModalProps> = ({ visible, onCancel, onOk, productId }) => {
    const { data } = useGetProductByIdQuery(productId)
    const [addSell] = useCreateSalesMutation()
    const product = data?.data
    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (product) {
            reset({
                product: product.name,
            });
        }
    }, [product, reset]);

    const onSubmit = async (data: any) => {
        const toastId = toast.loading('Please wait for a sec...');
        try {
            const formattedData = {
                ...data,
                product: productId,
                dateOfSale: data.dateOfSale ? data.dateOfSale.format('YYYY-MM-DD') : null,

            };

            const res = await addSell(formattedData)
            if (res?.data) {
                toast.success("The Product is sold", { id: toastId, duration: 2000 })
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

            title="Sell a Product"
            visible={visible}
            onCancel={onCancel}
            onOk={handleSubmit(onSubmit)}
        >
            <form>
                <div>
                    <Controller
                        name="product"
                        control={control}
                        defaultValue={product?.product}
                        rules={{ required: 'Product is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <div style={{ marginBottom: 16 }}>
                                <label>Product ID</label>
                                <Input {...field} />
                                {error && <span style={{ color: 'red' }}>{error.message}</span>}
                            </div>
                        )}
                    />

                    <Controller
                        name="stock"
                        control={control}
                        rules={{ required: 'Stock is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <div style={{ marginBottom: 16 }}>
                                <label>Stock</label>
                                <InputNumber {...field} style={{ width: '100%' }} />
                                {error && <span style={{ color: 'red' }}>{error.message}</span>}
                            </div>
                        )}
                    />
                    <label>Buyer Details</label>
                    <Row gutter={[12, 12]}>
                        <Col xs={24} lg={12} sm={24} xl={12}> <Controller
                            name="buyerDetails.name.firstName"
                            control={control}

                            rules={{ required: 'First name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label> First Name</label>
                                    <Input {...field} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        /></Col>
                        <Col xs={12} lg={12} sm={12} xl={12}><Controller
                            name="buyerDetails.name.lastName"
                            control={control}

                            rules={{ required: 'Last name is required' }}
                            render={({ field, fieldState: { error } }) => (
                                <div style={{ marginBottom: 16 }}>
                                    <label> Last Name</label>
                                    <Input {...field} />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </div>
                            )}
                        /></Col>
                    </Row>






                    <Controller
                        name="dateOfSale"
                        control={control}

                        rules={{ required: 'Date of Sale is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <div style={{ marginBottom: 16 }}>
                                <label>Date of Sale</label>
                                <DatePicker
                                    {...field}
                                    value={field.value ? moment(field.value) : null}
                                    style={{ width: '100%' }}
                                />
                                {error && <span style={{ color: 'red' }}>{error.message}</span>}
                            </div>
                        )}
                    />

                </div>

            </form>
        </Modal>
    )
}

export default SaleModal