import React from "react";
import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Button,
    Icon,
    Divider,
    useColorModeValue,
    VStack,
    HStack,
    Grid,
    GridItem,
    Image,
} from "@chakra-ui/react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaUser,
} from "react-icons/fa";
import MainTemPlate from "../../templates/MainTemPlate";
import { CompanyResponseType } from "../../../types/company";

// Define TypeScript interface based on the database schema
interface JobPosting {
    id: number;
    company_id: number;
    company: CompanyResponseType;
    recruiter_id: number;
    title: string;
    description: string;
    location: string;
    salary_range: string;
    experience: string;
    job_type: "full_time" | "part_time" | "internship" | "freelance";
    required_skills: string;
    status: "active" | "closed";
    created_at: string;
}

const JobDetail: React.FC = () => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const mutedColor = useColorModeValue("gray.600", "gray.400");

    const jobData: JobPosting = {
        id: 1,
        company_id: 24,
        company: {
            name: "Chi Nhánh Miền Bắc - Công ty Cổ Phần Phát Triển Đầu Tư Xây Dựng",
            logo_url:
                "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-phat-trien-phan-mem-xay-dung-aureole-5ef559f0a19ea.jpg",
            location:
                "Thôn Viên Nội, Xã Vân Nội, Huyện Đông Anh, Thành phố Hà Nội",
            website: "https://fstack.io.vn/",
        },
        recruiter_id: 12,
        title: "Kế Toán Tổng Hợp (Định Hướng Lên Kế Toán Trưởng/ Kế Toán Phó)",
        description:
            "Kiểm tra đối chiếu số liệu giữa các đơn vị nội bộ, dữ liệu chi tiết và tổng hợp;\nTính giá thành sản phẩm;\nKiểm tra việc tính thuế TNCN, chi phí làm căn cứ thuế;\nBáo cáo thuế GTGT và báo cáo thuế khối văn phòng CT;\nLập quyết toán Thuế;\nCác công việc khác liên quan.",
        location: "Hà Nội: Tòa nhà vườn Đào, 689 Lạc Long Quân, Tây Hồ",
        salary_range: "15 - 20 triệu",
        experience: "3 năm",
        job_type: "full_time",
        required_skills:
            "Đại học chuyên ngành kế toán doanh nghiệp, kế toán tài chính hoặc các ngành liên quan, Sử dụng thành thạo phần mềm tin học văn phòng, các phần mềm (fast) và các nghiệp vụ kế toán",
        status: "active",
        created_at: "2025-05-20T10:00:00",
    };

    return (
        <MainTemPlate>
            <Container maxW="container.xl" py={8}>
                <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={6}>
                    {/* Main Content */}
                    <GridItem>
                        <Box
                            bg={bgColor}
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            border="1px"
                            borderColor={borderColor}
                            mb={6}
                        >
                            {/* Header */}
                            <Flex
                                direction={{ base: "column", md: "row" }}
                                align={{ md: "center" }}
                                justify="space-between"
                                mb={6}
                            >
                                <Box flex="1">
                                    <Heading
                                        as="h1"
                                        size="xl"
                                        mb={2}
                                        color={useColorModeValue(
                                            "blue.700",
                                            "blue.300"
                                        )}
                                    >
                                        {jobData.title}
                                    </Heading>

                                    <HStack spacing={6} wrap="wrap">
                                        <Flex align="center">
                                            <Icon
                                                as={FaMapMarkerAlt}
                                                color="red.500"
                                                mr={2}
                                            />
                                            <Text>
                                                {jobData.company.location}
                                            </Text>
                                        </Flex>
                                        <Flex align="center">
                                            <Icon
                                                as={FaMoneyBillWave}
                                                color="green.500"
                                                mr={2}
                                            />
                                            <Text fontWeight="semibold">
                                                {jobData.salary_range}
                                            </Text>
                                        </Flex>
                                        <Flex align="center">
                                            <Icon
                                                as={FaBriefcase}
                                                color="orange.500"
                                                mr={2}
                                            />
                                            <Text>
                                                Kinh nghiệm:{" "}
                                                {jobData.experience}
                                            </Text>
                                        </Flex>
                                    </HStack>
                                </Box>
                            </Flex>

                            <Divider my={4} />

                            {/* Job Description */}
                            <Box mb={8}>
                                <Heading as="h3" size="md" mb={4}>
                                    Mô tả công việc
                                </Heading>
                                <Box
                                    dangerouslySetInnerHTML={{
                                        __html: jobData.description,
                                    }}
                                ></Box>
                            </Box>

                            {/* Apply Button */}
                            <Button
                                size="lg"
                                colorScheme="green"
                                width={{ base: "full", md: "auto" }}
                                leftIcon={<FaUser />}
                                mt={4}
                            >
                                Ứng tuyển ngay
                            </Button>
                        </Box>
                    </GridItem>

                    <GridItem>
                        <Box
                            bg={bgColor}
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            border="1px"
                            borderColor={borderColor}
                            mb={6}
                        >
                            <VStack align="start" spacing={4}>
                                <Heading as="h3" size="md" mb={2}>
                                    Thông tin công ty
                                </Heading>
                                <HStack>
                                    <Box>
                                        <Image
                                            src={jobData.company.logo_url}
                                            alt="Company Logo"
                                            w="100px"
                                            style={{ borderRadius: "8px" }}
                                        />
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold" fontSize="md">
                                            {jobData.company.name}
                                        </Text>
                                    </Box>
                                </HStack>

                                <Box width="100%">
                                    <Divider my={2} />
                                    <HStack align="flex-start" py={2} gap={0}>
                                        <Text color={mutedColor}>Địa chỉ:</Text>
                                        <Text
                                            fontWeight="medium"
                                            textAlign="right"
                                        >
                                            {jobData.company.location}
                                        </Text>
                                    </HStack>
                                </Box>

                                <Box width="100%">
                                    <Divider my={2} />
                                    <HStack py={2} align="flex-start">
                                        <Text color={mutedColor}>
                                            Chi tiết:
                                        </Text>
                                        <Text
                                            fontWeight="medium"
                                            textAlign="right"
                                        >
                                            {jobData.company.website}
                                        </Text>
                                    </HStack>
                                    <Divider my={2} />
                                </Box>

                                <Button
                                    colorScheme="blue"
                                    variant="outline"
                                    size="sm"
                                    width="full"
                                >
                                    Xem trang công ty
                                </Button>
                            </VStack>
                        </Box>

                        <Box
                            bg={bgColor}
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            border="1px"
                            borderColor={borderColor}
                        >
                            <Heading as="h3" size="md" mb={4}>
                                Khu vực
                            </Heading>

                            <HStack spacing={4}>
                                <Button
                                    variant="outline"
                                    colorScheme="blue"
                                    size="sm"
                                >
                                    Hà Nội
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme="blue"
                                    size="sm"
                                >
                                    Tây Hồ
                                </Button>
                            </HStack>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </MainTemPlate>
    );
};

export default JobDetail;
