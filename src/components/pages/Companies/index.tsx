import React from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    SimpleGrid,
    Card,
    CardBody,
    Stack,
    Image,
    Flex,
    useColorModeValue,
    HStack,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { CompanyResponseType } from "../../../types/company";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import MainTemPlate from "../../templates/MainTemPlate";

const CompanyCard = ({ company }: { company: CompanyResponseType }) => {
    const navigate = useNavigate();
    return (
        <Card
            maxW="md"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
            }}
            onClick={() =>
                navigate(
                    routesMap.CompanyDetail.replace("/:id", `/${company.id}`)
                )
            }
        >
            <CardBody>
                <Stack spacing={3}>
                    <HStack gap={4}>
                        <Image
                            src={company.logo_url}
                            alt={"logo"}
                            height="80px"
                            w="80px"
                            objectFit="contain"
                            border="1px solid"
                            borderColor="green"
                            rounded={10}
                        />
                        <Text size="sm" fontWeight={500}>
                            {company.name}
                        </Text>
                    </HStack>
                    <Text color="gray.600" fontSize="sm">
                        {company.description}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    );
};

const Companies: React.FC = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const headingColor = useColorModeValue("green.600", "green.300");

    const featuredCompanies = [
        {
            id: 1,
            name: "CÔNG TY CỔ PHẦN CÔNG NGHỆ & SÁNG TẠO TRẺ TEKY HOLDINGS",
            description:
                "Young can do ITTEKY là Tổ chức giáo dục công nghệ STEAM K12 chuẩn Mỹ tiên phong và dẫn đầu tại Việt Nam với hệ sinh thái Học viện - Nền tảng edtech...",
            logo_url:
                "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-phat-trien-phan-mem-xay-dung-aureole-5ef559f0a19ea.jpg",
        },
        {
            id: 2,
            name: "TRUNG TÂM DỊCH VỤ SỐ MOBIFONE - CHI NHÁNH TỔNG CÔNG TY VIỄN THÔNG MOBIFONE",
            description:
                "Trung tâm Dịch vụ sốMobiFone là đơn vị trực thuộc Tổng Công ty Viễn thông MobiFone với chức năng phát triển và kinh doanh các dịch vụ giá trị gia tăng...",
            logo_url:
                "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-phat-trien-phan-mem-xay-dung-aureole-5ef559f0a19ea.jpg",
        },
        {
            id: 3,
            name: "VUIHOC.VN",
            description:
                'VUIHOC là trường học trực tuyến cho học sinh từ lớp 1 đến lớp 12 với sứ mệnh "đem cơ hội tiếp cận bình đẳng các chương trình giáo dục chất lượng cao, chi phí hợp lý tới học sinh trên mọi miền tổ quốc"...',
            logo_url:
                "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-phat-trien-phan-mem-xay-dung-aureole-5ef559f0a19ea.jpg",
        },
    ];

    return (
        <MainTemPlate>
            <Box bg={bgColor} minH="100vh" w="100%" py={4}>
                {/* Hero Section */}
                <Container maxW="container.xl" pb={16}>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align="center"
                        justify="space-between"
                    >
                        <Box
                            maxW={{ base: "100%", md: "50%" }}
                            mb={{ base: 8, md: 0 }}
                        >
                            <Heading
                                as="h1"
                                size="lg"
                                color={headingColor}
                                mb={4}
                            >
                                Khám phá 100.000+ công ty nổi bật
                            </Heading>
                            <Text fontSize="lg" mb={8}>
                                Tra cứu thông tin công ty và tìm kiếm nơi làm
                                việc tốt nhất dành cho bạn
                            </Text>

                            {/* Search Box */}
                            <Flex>
                                <InputGroup size="lg" maxW="md">
                                    <InputLeftElement pointerEvents="none">
                                        <FiSearch color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Nhập tên công ty"
                                        bg="white"
                                        borderRadius="md"
                                        borderRight="none"
                                        borderRightRadius="none"
                                    />
                                </InputGroup>
                                <Button
                                    colorScheme="green"
                                    size="lg"
                                    borderLeftRadius="none"
                                >
                                    Tìm kiếm
                                </Button>
                            </Flex>
                        </Box>

                        <Box maxW={{ base: "80%", md: "45%" }}>
                            <Image
                                src="https://via.placeholder.com/600/4CAF50/FFFFFF?text=Job+Search"
                                alt="Job Search Illustration"
                            />
                        </Box>
                    </Flex>
                </Container>

                {/* Featured Companies Section */}
                <Container maxW="container.xl">
                    <Heading textAlign="center" mb={12} size="md">
                        DANH SÁCH CÁC CÔNG TY NỔI BẬT
                    </Heading>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={10}
                    >
                        {featuredCompanies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </MainTemPlate>
    );
};

export default Companies;
