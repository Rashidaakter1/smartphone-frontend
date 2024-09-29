import { Skeleton, Table } from "antd";
import { useGetSalesQuery } from "../../redux/features/sales/salesApi";


const SalesManagement = () => {
    const { data, isLoading, error } = useGetSalesQuery(undefined);
    console.log(data)
    const columns = [
        {
            title: "Product ID",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Buyer Name",
            dataIndex: ["buyerDetails", "name"],
            key: "buyerName",
            render: (name: { firstName: string; lastName: string }) => (
                `${name.firstName} ${name.lastName}`
            ),
        },
        {
            title: "Date of Sale",
            dataIndex: "dateOfSale",
            key: "dateOfSale",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },

    ];

    if (isLoading) {
        return <Skeleton active />;
    }

    if (error) {
        return <div>Error loading products</div>;
    }
    return (
        <Table columns={columns} dataSource={data?.data} pagination={false} />
    )
}

export default SalesManagement