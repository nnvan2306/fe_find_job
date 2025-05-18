import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Flex,
    Heading,
    Input,
    Stack,
    Tag,
    TagLabel,
    Text,
    useToast,
    IconButton,
    InputGroup,
    InputRightElement,
    Select,
} from "@chakra-ui/react";
import { FiSearch, FiDownload, FiEye, FiFilter } from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";

interface CV {
    id: number;
    user_id: number;
    title: string;
    required_skills: string;
    file_url: string;
    is_active: boolean;
    is_shared: boolean;
}

const FindCv = () => {
    const toast = useToast();

    const mockCVs: CV[] = [
        {
            id: 1,
            user_id: 101,
            title: "Senior React Developer",
            required_skills: "React, TypeScript, Node.js, Redux",
            file_url: "/sample-cv-1.pdf",
            is_active: true,
            is_shared: true,
        },
        {
            id: 2,
            user_id: 102,
            title: "UX/UI Designer",
            required_skills: "Figma, Adobe XD, HTML/CSS, User Testing",
            file_url: "/sample-cv-2.pdf",
            is_active: true,
            is_shared: false,
        },
        {
            id: 3,
            user_id: 103,
            title: "Full Stack Developer",
            required_skills: "JavaScript, Python, MongoDB, AWS",
            file_url: "/sample-cv-3.pdf",
            is_active: false,
            is_shared: true,
        },
        {
            id: 4,
            user_id: 104,
            title: "DevOps Engineer",
            required_skills: "Docker, Kubernetes, CI/CD, Linux",
            file_url: "/sample-cv-4.pdf",
            is_active: true,
            is_shared: true,
        },
        {
            id: 5,
            user_id: 105,
            title: "Mobile Developer",
            required_skills: "React Native, Swift, Kotlin, Firebase",
            file_url: "/sample-cv-5.pdf",
            is_active: true,
            is_shared: true,
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleDownload = (cv: CV) => {
        toast({
            title: "Downloading CV",
            description: `Downloading ${cv.title} CV...`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleView = (cv: CV) => {
        toast({
            title: "Viewing CV",
            description: `Opening ${cv.title} CV...`,
            status: "info",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <MainTemPlate>
            <Container maxW="container.xl" py={8}>
                <Heading mb={6}>CV Search</Heading>

                {/* Search and Filter Bar */}
                <Flex mb={6} direction={{ base: "column", md: "row" }} gap={4}>
                    <InputGroup size="md" flex={1}>
                        <Input
                            placeholder="Search by title or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            pr="4.5rem"
                        />
                        <InputRightElement width="4.5rem">
                            <FiSearch size={20} />
                        </InputRightElement>
                    </InputGroup>

                    <Select w="400px"></Select>

                    <Button
                        leftIcon={<FiFilter size={16} />}
                        colorScheme={isFilterOpen ? "blue" : "gray"}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        Filters
                    </Button>
                </Flex>

                {/* CV List */}
                <Stack spacing={4}>
                    {mockCVs.length > 0 ? (
                        mockCVs.map((cv) => (
                            <Card key={cv.id} variant="outline">
                                <CardHeader pb={0}>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                    >
                                        <Heading size="md" w="80%">
                                            {cv.title}
                                        </Heading>
                                        <Flex
                                            width="100%"
                                            justify="flex-end"
                                            gap={2}
                                        >
                                            <IconButton
                                                aria-label="View CV"
                                                icon={<FiEye size={18} />}
                                                size="sm"
                                                onClick={() => handleView(cv)}
                                            />
                                            <IconButton
                                                aria-label="Download CV"
                                                icon={<FiDownload size={18} />}
                                                colorScheme="blue"
                                                size="sm"
                                                onClick={() =>
                                                    handleDownload(cv)
                                                }
                                            />
                                        </Flex>
                                    </Flex>
                                </CardHeader>
                                <CardBody py={3}>
                                    <Text fontSize="sm" mb={3}>
                                        User ID: {cv.user_id}
                                    </Text>
                                    <Text fontWeight="semibold" mb={2}>
                                        Skills:
                                    </Text>
                                    <Flex wrap="wrap" gap={2}>
                                        {cv.required_skills
                                            .split(", ")
                                            .map((skill, index) => (
                                                <Tag
                                                    key={index}
                                                    size="md"
                                                    borderRadius="full"
                                                    variant="subtle"
                                                    colorScheme="blue"
                                                >
                                                    <TagLabel>{skill}</TagLabel>
                                                </Tag>
                                            ))}
                                    </Flex>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <Box textAlign="center" py={10}>
                            <Text fontSize="lg">
                                No CVs found matching your criteria
                            </Text>
                            <Text color="gray.500">
                                Try adjusting your search or filters
                            </Text>
                        </Box>
                    )}
                </Stack>
            </Container>
        </MainTemPlate>
    );
};

export default FindCv;
