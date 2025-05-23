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
    InputLeftElement,
    Button,
} from "@chakra-ui/react";
import { FiSearch, FiDownload, FiEye } from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";
import { useSearchParams } from "react-router-dom";
import { useGetCvs } from "../../../services/cv/get-cvs";
import { useTranslation } from "react-i18next";
import Pagination from "../../molecules/Pagination";

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
    const { t } = useTranslation();

    const [textSearch, setTextSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const page = useMemo(
        () => Number(searchParams.get("page")) || 1,
        [searchParams]
    );
    const pageSize = useMemo(
        () => Number(searchParams.get("pageSize")) || 10,
        [searchParams]
    );
    const text = useMemo(
        () => searchParams.get("search") || "",
        [searchParams]
    );

    const { data } = useGetCvs({
        nest: { is_shared: true, search: text, page: page, pageSize: pageSize },
    });
    const cvs = useMemo(() => data?.data || [], [data]);

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
                <Heading mb={6}>{t("findCv.title")}</Heading>

                <Flex mb={6} direction={{ base: "column", md: "row" }} w="100%">
                    <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                            <FiSearch color="gray.300" />
                        </InputLeftElement>
                        <Input
                            placeholder={t("findCv.placeholder")}
                            bg="white"
                            borderRadius="md"
                            borderRight="none"
                            borderRightRadius="none"
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                    </InputGroup>
                    <Button
                        colorScheme="green"
                        size="lg"
                        borderLeftRadius="none"
                        onClick={() => handleSearch()}
                    >
                        {t("buttons.search")}
                    </Button>
                </Flex>

                <Stack spacing={4}>
                    {cvs?.length > 0 ? (
                        cvs.map((cv) => (
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
                                        Email: {cv.user.email}
                                    </Text>
                                    <Text fontSize="sm" mb={3}>
                                        address: {cv.user.address}
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
                            <Text fontSize="lg">{t("findCv.mes")}</Text>
                            <Text color="gray.500">{t("findCv.subMes")}</Text>
                        </Box>
                    )}
                </Stack>
                {data?.data?.length ? (
                    <Pagination
                        currentPage={data?.pagination?.currentPage || 1}
                        totalPage={data?.pagination?.totalPages || 10}
                    />
                ) : null}
            </Container>
        </MainTemPlate>
    );
};

export default FindCv;
