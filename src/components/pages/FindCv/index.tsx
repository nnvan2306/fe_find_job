import { useEffect, useMemo, useState } from "react";
import {
    Box,
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
    IconButton,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { FiSearch, FiDownload, FiEye } from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";
import { useSearchParams } from "react-router-dom";

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
    const mockCVs: CV[] = [
        {
            id: 1,
            user_id: 101,
            title: "Senior React Developer",
            required_skills: "React, TypeScript, Node.js, Redux",
            file_url:
                "https://www.topcv.vn/xem-cv/BQIDVgwHUlNRBgQIAV1TA14LV1YCClRUAVQFAw21c9",
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

    const [textSearch, setTextSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const text = useMemo(() => searchParams.get("search"), [searchParams]);

    const handleSearch = () => {
        setSearchParams({ search: textSearch });
    };

    const handleDownload = async (cv: CV) => {
        try {
            const response = await fetch(cv.file_url, {
                mode: "cors",
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "cv.pdf";
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Tải file thất bại:", error);
        }
    };

    const handleView = (cv: CV) => {
        window.open(cv.file_url, "_blank");
    };
    useEffect(() => {
        if (text) {
            setTextSearch(text);
        }
    }, [text]);

    return (
        <MainTemPlate>
            <Container maxW="container.xl" py={8}>
                <Heading mb={6}>CV Search</Heading>

                <Flex mb={6} direction={{ base: "column", md: "row" }} gap={4}>
                    <InputGroup size="md" flex={1} overflow="hidden">
                        <Input
                            placeholder="Search by title or skills..."
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                            pr="4.5rem"
                        />
                        <InputRightElement
                            width="4.5rem"
                            cursor="pointer"
                            bg="green.400"
                            color="white"
                            roundedRight={5}
                            onClick={() => handleSearch()}
                        >
                            <FiSearch size={20} />
                        </InputRightElement>
                    </InputGroup>
                </Flex>

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
