import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    PinInput,
    PinInputField,
    Text,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import React, { useState } from 'react';
import axios from "../../../libs/axios";

interface ForgotPasswordFormData {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

const ForgotPassword: React.FC = () => {
    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [step, setStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

        // Clear error for this field when the user types
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleOtpChange = (value: string) => {
        setFormData(prev => ({ ...prev, otp: value }));
        if (errors.otp) {
            setErrors(prev => ({ ...prev, otp: '' }));
        }
    };

    const validateStep1 = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.otp) {
            newErrors.otp = 'Mã OTP không được để trống';
        } else if (formData.otp.length !== 6) {
            newErrors.otp = 'Mã OTP phải có 6 ký tự';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'Mật khẩu mới không được để trống';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep1()) return;

        setIsSubmitting(true);

        try {
            const res = await axios.get(`/auth/otp?email=${formData.email}`);

            if (res.data.code === HttpStatusCode.Ok) {
                setStep(1);
                setIsEmailSent(true);
                toast({
                    title: 'Mã OTP đã được gửi',
                    description: 'Chúng tôi đã gửi mã OTP đến email của bạn.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Đã xảy ra lỗi',
                description: 'Không thể gửi mã OTP. Vui lòng thử lại sau.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep2()) return;

        setIsSubmitting(true);

        try {
            const res = await axios.post('/auth/otp', {
                email: formData.email,
                otp: formData.otp,
                password: formData.newPassword
            });

            if (res.data.code === HttpStatusCode.Ok) {
                setStep(2);
                toast({
                    title: 'Mật khẩu đã được đặt lại',
                    description: 'Bạn có thể đăng nhập bằng mật khẩu mới.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                window.location.href = '/login';
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Đã xảy ra lỗi',
                description: 'Không thể đặt lại mật khẩu. Vui lòng kiểm tra lại mã OTP và thử lại.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        setIsSubmitting(true);

        try {
            const res = await axios.get(`/auth/otp?email=${formData.email}`);

            if (res.data.code === HttpStatusCode.Ok) {
                toast({
                    title: 'Mã OTP mới đã được gửi',
                    description: 'Chúng tôi đã gửi mã OTP mới đến email của bạn.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Đã xảy ra lỗi',
                description: 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep0 = () => (
        <form onSubmit={handleSubmitEmail}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <EmailIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your-email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>
                <Button
                    colorScheme="blue"
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Đang gửi"
                >
                    Gửi mã OTP
                </Button>
            </VStack>
        </form>
    );

    const renderStep1 = () => (
        <form onSubmit={handleResetPassword}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.otp}>
                    <FormLabel htmlFor="otp">Mã OTP</FormLabel>
                    <HStack justifyContent="center">
                        <PinInput
                            otp
                            size="lg"
                            value={formData.otp}
                            onChange={handleOtpChange}
                        >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>
                    {errors.otp && <FormErrorMessage textAlign="center">{errors.otp}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={!!errors.newPassword}>
                    <FormLabel htmlFor="newPassword">Mật khẩu mới</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <LockIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu mới"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                        <InputRightElement>
                            <Button
                                variant="ghost"
                                onClick={() => setShowPassword(!showPassword)}
                                size="sm"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.newPassword && <FormErrorMessage>{errors.newPassword}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel htmlFor="confirmPassword">Xác nhận mật khẩu</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <LockIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu mới"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <InputRightElement>
                            <Button
                                variant="ghost"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                size="sm"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
                </FormControl>

                <Button
                    colorScheme="blue"
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Đang đặt lại mật khẩu"
                >
                    Đặt lại mật khẩu
                </Button>

                <Button
                    variant="link"
                    colorScheme="blue"
                    onClick={handleResendOtp}
                    isDisabled={isSubmitting}
                >
                    Gửi lại mã OTP
                </Button>
            </VStack>
        </form>
    );

    const renderStep2 = () => (
        <VStack spacing={4}>
            <Box textAlign="center">
                <Text fontSize="xl" color="green.500" mb={4}>
                    🎉 Mật khẩu đã được đặt lại thành công!
                </Text>
                <Text color="gray.600">
                    Bạn có thể sử dụng mật khẩu mới để đăng nhập vào tài khoản của mình.
                </Text>
            </Box>
            <Button
                colorScheme="blue"
                width="full"
                as={Link}
                href="/login"
            >
                Đi đến trang đăng nhập
            </Button>
        </VStack>
    );

    return (
        <Container maxW="md" py={12}>
            <Box
                rounded="lg"
                bg="white"
                boxShadow="lg"
                p={8}
                borderWidth="1px"
                borderColor="gray.200"
            >
                <VStack spacing={6} align="stretch">
                    <Box textAlign="center">
                        <Heading size="lg" mb={2}>
                            {step === 0 && 'Quên mật khẩu'}
                            {step === 1 && 'Đặt lại mật khẩu'}
                            {step === 2 && 'Hoàn thành'}
                        </Heading>
                        {step === 0 && (
                            <Text color="gray.600">
                                Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn mã OTP để đặt lại mật khẩu.
                            </Text>
                        )}
                        {step === 1 && (
                            <Text color="gray.600">
                                Nhập mã OTP đã được gửi đến email {formData.email} và mật khẩu mới của bạn.
                            </Text>
                        )}
                    </Box>

                    {step === 0 && renderStep0()}
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}

                    {step < 2 && (
                        <Box textAlign="center" pt={2}>
                            <Link color="blue.500" href="/login">
                                Quay lại trang đăng nhập
                            </Link>
                        </Box>
                    )}
                </VStack>
            </Box>
        </Container>
    );
};

export default ForgotPassword;