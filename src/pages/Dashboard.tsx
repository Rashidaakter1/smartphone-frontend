import { useGetUserQuery } from "../redux/features/auth/authApi"



const Dashboard = () => {
    const { data, error, isLoading } = useGetUserQuery(undefined)
    console.log(data)
    return (
        <div>Dashboard </div>
    )
}

export default Dashboard