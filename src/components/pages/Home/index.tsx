import React from "react";
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    InputGroup,
    InputLeftElement,
    Icon,
    Avatar,
    Heading,
    VStack,
    HStack,
    useColorModeValue,
    Container,
    Checkbox,
    Tag,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    AccordionItem,
    Accordion,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { FiChevronDown, FiSearch, FiCheck, FiFilter } from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { CompanyResponseType } from "../../../types/company";

// Custom Filter component
const FilterAccordion: React.FC<{
    title: string;
    children: React.ReactNode;
    count?: number;
}> = ({ title, children, count }) => {
    return (
        <AccordionItem border="none">
            <AccordionButton px={0} py={2}>
                <Box flex="1" textAlign="left" fontWeight="medium">
                    {title}
                    {count && (
                        <Tag
                            size="sm"
                            ml={2}
                            colorScheme="gray"
                            variant="subtle"
                        >
                            {count}
                        </Tag>
                    )}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={0} py={2}>
                {children}
            </AccordionPanel>
        </AccordionItem>
    );
};

// Job card component
interface JobData {
    id: number;
    title: string;
    company: CompanyResponseType;
    location: string;
    salary: string;
    experience: string;
    requirements?: string;
    category: string;
    isVerified: boolean;
    postedTime: string;
}

const JobCard: React.FC<{ job: JobData }> = ({ job }) => {
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const navigate = useNavigate();

    return (
        <Card
            mb={3}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            cursor="pointer"
            onClick={() =>
                navigate(routesMap.JobDetail.replace("/:id", `/${job.id}`))
            }
        >
            <CardBody p={0}>
                <Flex p={4}>
                    <Box mr={4}>
                        <Avatar
                            src={job.company.logo_url}
                            size="lg"
                            name={job.company.name}
                            bg="gray.100"
                            borderRadius="md"
                        />
                    </Box>
                    <Box flex="1">
                        <Flex
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Heading as="h3" size="md" color="teal.700">
                                {job.title}
                                {job.isVerified && (
                                    <Icon
                                        as={FiCheck}
                                        ml={2}
                                        color="green.500"
                                    />
                                )}
                            </Heading>
                            <Text color="green.500" fontWeight="bold">
                                {job.salary}
                            </Text>
                        </Flex>
                        <Text fontWeight="bold" mt={1}>
                            {job.company.name}
                        </Text>
                        <Flex mt={2} flexWrap="wrap">
                            <Tag size="sm" mr={2} mb={2} bg="gray.100">
                                {job.location}
                            </Tag>
                            <Tag size="sm" mr={2} mb={2} bg="gray.100">
                                {job.experience}
                            </Tag>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontSize="sm" color="gray.500" mt={1}>
                                {job.category}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                {job.postedTime}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
    );
};

const Home = () => {
    // Sample job data
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

    return (
        <MainTemPlate>
            <Box w="100%">
                <Box bg="green.600" py={5} px={4} w="100%">
                    <Container maxW="container.xl" w="100%">
                        <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap" }}>
                            <Box
                                position="relative"
                                flex={{ base: "1 0 100%", md: 1 }}
                            >
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        leftIcon={<FiChevronDown />}
                                        variant="outline"
                                        bg="white"
                                        w="full"
                                        textAlign="left"
                                        justifyContent="flex-start"
                                    >
                                        Danh mục Nghề
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>IT - Phần mềm</MenuItem>
                                        <MenuItem>Marketing</MenuItem>
                                        <MenuItem>Kế toán</MenuItem>
                                        <MenuItem>
                                            Bán lẻ/Dịch vụ tiêu dùng
                                        </MenuItem>
                                        <MenuItem>Chăm sóc khách hàng</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>

                            <InputGroup flex={{ base: "1 0 100%", md: 2 }}>
                                <InputLeftElement pointerEvents="none">
                                    <FiSearch color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Vị trí tuyển dụng"
                                    bg="white"
                                />
                            </InputGroup>

                            <Box
                                position="relative"
                                flex={{ base: "1 0 100%", md: 1 }}
                            >
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<FiChevronDown />}
                                        variant="outline"
                                        bg="white"
                                        w="full"
                                        textAlign="left"
                                        justifyContent="flex-start"
                                    >
                                        Địa điểm
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Hà Nội</MenuItem>
                                        <MenuItem>Hồ Chí Minh</MenuItem>
                                        <MenuItem>Đà Nẵng</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>

                            <Button
                                colorScheme="green"
                                px={10}
                                flex={{ base: "1 0 100%", md: "0 0 auto" }}
                            >
                                Tìm kiếm
                            </Button>
                        </Flex>
                    </Container>
                </Box>

                <Container maxW="container.xl" py={4}>
                    <Flex
                        flexDirection={{ base: "column", md: "row" }}
                        align="stretch"
                    >
                        <Box
                            as="nav"
                            width={{ base: "100%", md: "250px" }}
                            pr={{ md: 6 }}
                            mb={{ base: 4, md: 0 }}
                        >
                            <Box mb={4} mt={2}>
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    py={2}
                                >
                                    <Text fontWeight="bold" fontSize="lg">
                                        <Icon as={FiFilter} mr={2} />
                                        Lọc nâng cao
                                    </Text>
                                    <Button
                                        variant="link"
                                        colorScheme="green"
                                        size="sm"
                                    >
                                        Xóa lọc
                                    </Button>
                                </Flex>
                            </Box>

                            <Accordion allowMultiple defaultIndex={[0, 1]}>
                                <FilterAccordion title="Theo danh mục nghề">
                                    <VStack align="start" spacing={1}>
                                        <Checkbox>
                                            Marketing{" "}
                                            <Text as="span" color="gray.500">
                                                (4267)
                                            </Text>
                                        </Checkbox>
                                        <Checkbox>
                                            Kế toán{" "}
                                            <Text as="span" color="gray.500">
                                                (3781)
                                            </Text>
                                        </Checkbox>
                                        <Checkbox>
                                            Sales Bán lẻ/Dịch vụ tiêu dùng{" "}
                                            <Text as="span" color="gray.500">
                                                (1778)
                                            </Text>
                                        </Checkbox>
                                        <Checkbox>
                                            Chăm sóc khách hàng{" "}
                                            <Text as="span" color="gray.500">
                                                (1526)
                                            </Text>
                                        </Checkbox>
                                        <Checkbox>
                                            Nhân sự{" "}
                                            <Text as="span" color="gray.500">
                                                (1439)
                                            </Text>
                                        </Checkbox>
                                        <Button
                                            variant="link"
                                            colorScheme="green"
                                            size="sm"
                                            mt={2}
                                        >
                                            Xem thêm
                                        </Button>
                                    </VStack>
                                </FilterAccordion>

                                {/* Add more filters as needed */}
                            </Accordion>
                        </Box>

                        <Box flex="1">
                            <Box mb={4}>
                                <Flex
                                    mt={4}
                                    justify="start"
                                    alignItems="center"
                                    flexWrap="wrap"
                                    gap={2}
                                >
                                    <Text fontWeight="medium">
                                        Tìm kiếm theo:
                                    </Text>
                                    <HStack spacing={2} flexWrap="wrap">
                                        <Button variant="outline" size="sm">
                                            Tên việc làm
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Tên công ty
                                        </Button>
                                        <Button
                                            colorScheme="green"
                                            size="sm"
                                            leftIcon={<FiCheck />}
                                        >
                                            Cả hai
                                        </Button>
                                    </HStack>
                                </Flex>
                            </Box>

                            <Box>
                                {jobs.map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </Box>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </MainTemPlate>
    );
};

export default Home;
