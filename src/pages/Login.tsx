
import { z } from "zod";
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Card, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Infer the type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        // resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
        // Here you would typically send the data to your authentication service
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, }}>
                <div>
                    Login
                </div>
                <Form onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Form.Item validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
                                <Input
                                    {...field}
                                    prefix={<UserOutlined />}
                                    placeholder="Username"
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

