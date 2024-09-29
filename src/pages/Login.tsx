
import { z } from "zod";
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Card, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogInUserMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import verifyToken from "../utils/verifyToken";
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Infer the type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const [addUser] = useLogInUserMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        // resolver: zodResolver(loginSchema)
        defaultValues: {
            email: 'fotox38462@abevw.com',
            password: 'AlinaJahan@1',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        const toastId = toast.loading('Logging in');
        try {
            const userInfo = {
                email: data.email,
                password: data.password
            }

            const response = await addUser(userInfo).unwrap()
            const user = verifyToken(response.data.accessToken)
            const userData = { user: user, token: response.data.accessToken }
            const r= dispatch(setUser(userData))
            console.log(r)
            toast.success("You have logged in successfully", { id: toastId, duration: 2000 })
            navigate("/dashboard")
        } catch (error) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }


    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400 }}>
                <div>
                    Login
                </div>
                <Form onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                                <Input
                                    {...field}
                                    prefix={<UserOutlined />}
                                    placeholder="email"
                                />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                                <Input.Password
                                    {...field}
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                        )}
                    />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login

