import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Link,
    Icon,
    HStack,
    Container,
    useColorModeValue,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    Divider,
} from "@chakra-ui/react";
import { FaGlobe, FaUsers, FaMap } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import GoogleMap from "../../molecules/GoogleMap";
import MainTemPlate from "../../templates/MainTemPlate";
import JobCard from "../../organisms/JobCard";

const jobs = [
    {
        id: 1,
        title: "Nhân Viên Kinh Doanh/Telesale/Tư Vấn/Chăm Sóc Khách Hàng",
        company: {
            id: 1,
            title: "Tech Solutions",
        },
        location: "Hồ Chí Minh",
        salary: "15 - 30 triệu",
        experience: "Không yêu cầu",
        requirements: "",
        category: "Call Center/Trực tổng đài",
        isVerified: true,
        postedTime: "Đăng 1 tuần trước",
    },
    {
        id: 2,
        title: "Frontend Developer (Middle/Senior) - Mức Lương 1000$ - 2000$",
        company: {
            id: 2,
            title: "Tech Solutions",
        },
        location: "Hà Nội",
        salary: "1,000 - 2,000 USD",
        experience: "1 năm",
        requirements: "ReactJS, JavaScript",
        category: "IT - Phần mềm",
        isVerified: true,
        postedTime: "Đăng 3 ngày trước",
    },
];

interface CompanyData {
    id: number;
    owner_id: number;
    name: string;
    description: string;
    website: string;
    logo_url: string;
    location: string;
    verified: boolean;
    employeeCount: string;
}

const CompanyDetail: React.FC = () => {
    // Mock data based on the provided database structure and image
    const companyData: CompanyData = {
        id: 1,
        owner_id: 123,
        name: "Công ty Phát triển Phần mềm Xây dựng Aureole",
        description:
            "Được thành lập từ năm 2001, Công ty Aureole CSO INC - một công ty chuyên về ứng dụng phần mềm trong lĩnh vực xây dựng, đã khẳng định được vị trí của mình ở thị trường Nhật Bản với số lượng khách hàng ngày càng lớn. Với mục tiêu trở thành công ty ứng dụng đa dạng các phần mềm xây dựng (Cad, Revit, 3Dsmax,...) vào triển khai, gia công bản vẽ lớn nhất Việt Nam và mở rộng thị trường ra các nước Đông Nam Á. Chúng tôi mời gọi các ứng viên có năng lực gia nhập vào đội ngũ nhân viên của chúng tôi.",
        website: "https://www.mitani.co.jp/VN/aureole/acsci",
        logo_url: "/path/to/aureole_logo.png",
        location:
            "Tầng 22, Tòa nhà AB Tower, 76 Lê Lai, P. Bến Thành, Quận 1, TP.HCM",
        verified: true,
        employeeCount: "500-1000 nhân viên",
    };

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const headerBgColor = useColorModeValue("green.500", "green.600");
    const secondaryBgColor = useColorModeValue("green.50", "green.900");

    return (
        <MainTemPlate>
            <Container maxW="container.xl" p={0}>
                {/* Header Section with Logo and Company Name */}
                <Flex
                    w="100%"
                    bg={headerBgColor}
                    color="white"
                    p={4}
                    direction={{ base: "column", md: "row" }}
                    alignItems="center"
                >
                    <Flex flex="1" alignItems="center">
                        <Box
                            w="80px"
                            h="80px"
                            bg="white"
                            borderRadius="md"
                            mr={4}
                            p={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image
                                src={companyData.logo_url}
                                fallbackSrc="https://via.placeholder.com/80"
                                alt={"logo"}
                                objectFit="contain"
                            />
                        </Box>
                        <Box>
                            <Heading size="md" mb={2}>
                                {companyData.name}
                            </Heading>
                            <Flex alignItems="center" mb={2}>
                                <Icon as={FaGlobe} mr={2} />
                                <Link
                                    href={companyData.website}
                                    isExternal
                                    color="white"
                                    fontSize="sm"
                                >
                                    {companyData.website}
                                </Link>
                            </Flex>
                            <Flex alignItems="center">
                                <Icon as={FaUsers} mr={2} />
                                <Text fontSize="sm">
                                    {companyData.employeeCount}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>

                {/* Main Content */}
                <Flex direction={{ base: "column", lg: "row" }} w="100%">
                    {/* Left Column - Company Info */}
                    <Box
                        flex="7"
                        bg={bgColor}
                        borderRadius="md"
                        boxShadow="sm"
                        m={2}
                        borderWidth="1px"
                    >
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <AccordionButton
                                    px={2}
                                    bg={secondaryBgColor}
                                    _hover={{ bg: secondaryBgColor }}
                                >
                                    <Box
                                        bg={secondaryBgColor}
                                        p={2}
                                        borderRadius="md"
                                        mb={4}
                                        flex="1"
                                        textAlign="left"
                                    >
                                        <Heading size="sm" color="green.700">
                                            Giới thiệu công ty
                                        </Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text mb={4}>
                                        {companyData.description}
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>

                    {/* Right Column - Contact Info and Social Media */}
                    <Box
                        flex="3"
                        bg={bgColor}
                        p={4}
                        borderRadius="md"
                        boxShadow="sm"
                        m={2}
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Box
                            bg={secondaryBgColor}
                            p={2}
                            borderRadius="md"
                            mb={4}
                        >
                            <Heading size="sm" color="green.700">
                                Thông tin liên hệ
                            </Heading>
                        </Box>

                        <Box borderRadius="md" overflow="hidden" mb={4}>
                            <HStack mb={3}>
                                <Icon
                                    as={MdLocationOn}
                                    fontSize={20}
                                    color={"green"}
                                />
                                <Text>địa chi công ty</Text>
                            </HStack>
                            <Text>{companyData.location}</Text>
                        </Box>
                        <Divider my={2} />
                        <Box borderRadius="md" overflow="hidden" mb={4}>
                            <HStack mb={3}>
                                <Icon
                                    as={FaMap}
                                    fontSize={20}
                                    color={"green"}
                                />
                                <Text>xem bản đồ</Text>
                            </HStack>
                            <GoogleMap address={companyData.location} />
                        </Box>
                    </Box>
                </Flex>

                {/* Job Openings Section */}
                <Box
                    bg={bgColor}
                    p={4}
                    borderRadius="md"
                    boxShadow="sm"
                    m={2}
                    borderWidth="1px"
                    borderColor={borderColor}
                >
                    <Box bg={secondaryBgColor} p={2} borderRadius="md" mb={4}>
                        <Heading size="sm" color="green.700">
                            Tuyển dụng
                        </Heading>
                    </Box>
                    <Box>
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </MainTemPlate>
    );
};

export default CompanyDetail;
