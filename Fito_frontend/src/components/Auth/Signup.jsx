import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice'; // Update path as needed
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector(state => state.auth);

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleRegister = async (values) => {
        const result = await dispatch(registerUser(values));
        
        if (registerUser.fulfilled.match(result)) {
            console.log('Registration Successful');
            navigate('/login');
        } else {
            console.log('Registration Failed', result.error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create your account 📝</h1>
                
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="space-y-4">
                                <div>
                                    <Field
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="p"
                                        className="text-red-500 text-center"
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-red-500 text-center"
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-center"
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="p"
                                        className="text-red-500 text-center"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-6">
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-[#bde800] text-white rounded-md hover:bg-[#879d15] transition duration-200"
                                    disabled={isSubmitting || isLoading}
                                >
                                    {isLoading ? 'Registering...' : 'Sign Up'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {error && <p className="text-red-500 text-center mt-4">{error.message || 'Email already used'}</p>}

                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-[#bde800] cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Log in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
