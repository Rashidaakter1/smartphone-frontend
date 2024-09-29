

import { Button, Layout, Menu } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from "../../assets/icons/ebuy.svg"
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';
const { Header, Content, Footer, Sider } = Layout;

const items = [{
    key: "dashboard",
    label: <NavLink to="/dashboard">Dashboard</NavLink>
},
{
    key: "Product",
    label: <NavLink to="/product">Product</NavLink>,
    children: [
        {
            key: "create",
            label: "Create"
        }
    ]
},
{
    key: "Sales Management",
    label: <NavLink to="/sales-management">Sales Management</NavLink>,
    children: [
        {
            key: "create",
            label: "Create"
        }
    ]
}
]

const MainLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth/signin")
    }
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} ><img style={{ width: "80px", marginBlock: "12px" }} src={logo} alt="ebay-logo" /></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header ><Button onClick={() => handleLogout()}>logout</Button></Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,

                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout