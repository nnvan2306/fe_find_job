import {
    Box,
    Container,
    Grid,
    GridItem,
    Text,
    VStack,
    HStack,
    Link,
    Divider,
    IconButton,
    Heading,
    useColorModeValue,
    Flex,
    Stack,
} from "@chakra-ui/react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaHeart,
} from "react-icons/fa";

const Footer = () => {
    const bgColor = useColorModeValue("gray.800", "gray.900");
    const textColor = useColorModeValue("gray.200", "gray.300");
    const headingColor = useColorModeValue("white", "white");
    const borderColor = useColorModeValue("gray.600", "gray.700");
    const hoverColor = useColorModeValue("blue.400", "blue.300");

    const socialLinks = [
        { icon: FaFacebook, href: "#", label: "Facebook" },
        { icon: FaTwitter, href: "#", label: "Twitter" },
        { icon: FaInstagram, href: "#", label: "Instagram" },
        { icon: FaLinkedin, href: "#", label: "LinkedIn" },
        { icon: FaYoutube, href: "#", label: "YouTube" },
    ];

    const quickLinks = [
        { label: "Trang chủ", href: "#" },
        { label: "Tìm việc làm", href: "#" },
        { label: "Công ty", href: "#" },
        { label: "Đăng tuyển", href: "#" },
        { label: "Hướng dẫn", href: "#" },
        { label: "Liên hệ", href: "#" },
    ];

    const services = [
        { label: "Việc làm IT", href: "#" },
        { label: "Việc làm Marketing", href: "#" },
        { label: "Việc làm Kế toán", href: "#" },
        { label: "Việc làm Bán hàng", href: "#" },
        { label: "Việc làm Nhân sự", href: "#" },
        { label: "Việc làm khác", href: "#" },
    ];

    return (
        <Box bg={bgColor} color={textColor} py={10} mt={20}>
            <Container maxW="7xl">
                {/* Main Footer Content */}
                <Grid
                    templateColumns={{
                        base: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap={8}
                    mb={8}
                >
                    {/* Company Info */}
                    <GridItem>
                        <VStack align="flex-start" spacing={4}>
                            <Heading size="md" color={headingColor}>
                                Find Job
                            </Heading>
                            <Text fontSize="sm" lineHeight="tall">
                                Nền tảng tuyển dụng hàng đầu Việt Nam, kết nối
                                ứng viên tài năng với các cơ hội việc làm tốt
                                nhất từ hàng nghìn doanh nghiệp uy tín.
                            </Text>

                            {/* Contact Info */}
                            <VStack align="flex-start" spacing={2} pt={2}>
                                <HStack>
                                    <Box
                                        as={FaMapMarkerAlt}
                                        color={hoverColor}
                                    />
                                    <Text fontSize="sm">Tây Mỗ, Hà Nội</Text>
                                </HStack>
                                <HStack>
                                    <Box as={FaPhone} color={hoverColor} />
                                    <Text fontSize="sm">+84 123 456 789</Text>
                                </HStack>
                                <HStack>
                                    <Box as={FaEnvelope} color={hoverColor} />
                                    <Text fontSize="sm">
                                        contact@findjob.vn
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </GridItem>

                    {/* Quick Links */}
                    <GridItem>
                        <VStack align="flex-start" spacing={4}>
                            <Heading size="md" color={headingColor}>
                                Liên kết nhanh
                            </Heading>
                            <VStack align="flex-start" spacing={2}>
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        fontSize="sm"
                                        _hover={{
                                            color: hoverColor,
                                            textDecoration: "none",
                                            transform: "translateX(4px)",
                                        }}
                                        transition="all 0.2s"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </VStack>
                        </VStack>
                    </GridItem>

                    {/* Services */}
                    <GridItem>
                        <VStack align="flex-start" spacing={4}>
                            <Heading size="md" color={headingColor}>
                                Danh mục việc làm
                            </Heading>
                            <VStack align="flex-start" spacing={2}>
                                {services.map((service, index) => (
                                    <Link
                                        key={index}
                                        href={service.href}
                                        fontSize="sm"
                                        _hover={{
                                            color: hoverColor,
                                            textDecoration: "none",
                                            transform: "translateX(4px)",
                                        }}
                                        transition="all 0.2s"
                                    >
                                        {service.label}
                                    </Link>
                                ))}
                            </VStack>
                        </VStack>
                    </GridItem>

                    {/* Social Media & Newsletter */}
                    <GridItem>
                        <VStack align="flex-start" spacing={4}>
                            <Heading size="md" color={headingColor}>
                                Kết nối với chúng tôi
                            </Heading>
                            <Text fontSize="sm">
                                Theo dõi chúng tôi trên các mạng xã hội để cập
                                nhật thông tin mới nhất
                            </Text>

                            {/* Social Icons */}
                            <HStack spacing={3} pt={2}>
                                {socialLinks.map((social, index) => (
                                    <IconButton
                                        key={index}
                                        as="a"
                                        href={social.href}
                                        aria-label={social.label}
                                        icon={<social.icon />}
                                        size="sm"
                                        variant="ghost"
                                        color={textColor}
                                        _hover={{
                                            color: hoverColor,
                                            bg: "whiteAlpha.200",
                                            transform: "translateY(-2px)",
                                        }}
                                        transition="all 0.2s"
                                    />
                                ))}
                            </HStack>

                            {/* Newsletter Signup */}
                            {/* <Box pt={4} w="full">
                                <Text
                                    fontSize="sm"
                                    mb={2}
                                    fontWeight="semibold"
                                >
                                    Đăng ký nhận tin tức
                                </Text>
                                <Flex
                                    direction={{ base: "column", sm: "row" }}
                                    gap={2}
                                >
                                    <Box
                                        as="input"
                                        type="email"
                                        placeholder="Email của bạn"
                                        bg="whiteAlpha.100"
                                        border="1px solid"
                                        borderColor={borderColor}
                                        color={textColor}
                                        px={3}
                                        py={2}
                                        borderRadius="md"
                                        fontSize="sm"
                                        flex={1}
                                        _placeholder={{ color: "gray.400" }}
                                        _focus={{
                                            borderColor: hoverColor,
                                            outline: "none",
                                        }}
                                    />
                                    <Box
                                        as="button"
                                        bg={hoverColor}
                                        color="white"
                                        px={4}
                                        py={2}
                                        borderRadius="md"
                                        fontSize="sm"
                                        fontWeight="semibold"
                                        _hover={{
                                            bg: "blue.500",
                                            transform: "translateY(-1px)",
                                        }}
                                        transition="all 0.2s"
                                    >
                                        Đăng ký
                                    </Box>
                                </Flex>
                            </Box> */}
                        </VStack>
                    </GridItem>
                </Grid>

                {/* Divider */}
                <Divider borderColor={borderColor} my={8} />

                {/* Bottom Footer */}
                <Stack
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    spacing={4}
                    fontSize="sm"
                >
                    <Flex align="center" gap={1}>
                        <Text>© 2025 Your Company. Made with</Text>
                        <Box as={FaHeart} color="red.400" />
                        <Text>in Vietnam</Text>
                    </Flex>

                    <HStack spacing={6}>
                        <Link
                            href="#"
                            _hover={{
                                color: hoverColor,
                                textDecoration: "none",
                            }}
                            transition="color 0.2s"
                        >
                            Chính sách bảo mật
                        </Link>
                        <Link
                            href="#"
                            _hover={{
                                color: hoverColor,
                                textDecoration: "none",
                            }}
                            transition="color 0.2s"
                        >
                            Điều khoản sử dụng
                        </Link>
                        <Link
                            href="#"
                            _hover={{
                                color: hoverColor,
                                textDecoration: "none",
                            }}
                            transition="color 0.2s"
                        >
                            Sitemap
                        </Link>
                    </HStack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
