import React, { useEffect, useMemo, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import MainTemPlate from "../../templates/MainTemPlate";
import { useGetCompanis } from "../../../services/company/get-companies";
import { useTranslation } from "react-i18next";
import Pagination from "../../molecules/Pagination";

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
                    {/* <Text color="gray.600" fontSize="sm">
                        {company.description}
                    </Text> */}
                    <Text
                        color="gray.600"
                        fontSize="sm"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 5,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
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

    const handleSearch = () => {
        setSearchParams({ search: textSearch });
    };

    const { data } = useGetCompanis({
        nest: {
            search: text,
            status: "active",
            page: page,
            pageSize: pageSize,
        },
    });

    useEffect(() => {
        if (text) {
            setTextSearch(text);
        }
    }, [text]);

    return (
        <MainTemPlate>
            <Box bg={bgColor} minH="100vh" w="100%" py={4}>
                <Container maxW={{ base: "container.xl", lg: "100%" }} pb={16}>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align="center"
                        justify="space-between"
                        bgGradient="linear(to-b, #d7fbe8, #ffffff)"
                        px={{ base: "16px", lg: "120px" }}
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
                                {t("companies.title")}
                            </Heading>
                            <Text fontSize="lg" mb={8}>
                                {t("companies.subTitle")}
                            </Text>

                            <Flex
                                mb={6}
                                direction={{ base: "column", md: "row" }}
                                w="100%"
                            >
                                <InputGroup size="lg">
                                    <InputLeftElement pointerEvents="none">
                                        <FiSearch color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        placeholder={t("companies.placeholder")}
                                        bg="white"
                                        borderRadius="md"
                                        borderRight="none"
                                        borderRightRadius="none"
                                        value={textSearch}
                                        onChange={(e) =>
                                            setTextSearch(e.target.value)
                                        }
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
                        </Box>

                        <Box maxW={{ base: "80%", md: "45%" }}>
                            <Image
                                w="200px"
                                src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
                                alt="Job Search Illustration"
                            />
                        </Box>
                    </Flex>
                </Container>

                {/* Featured Companies Section */}
                <Container maxW="container.xl">
                    <Heading textAlign="center" mb={12} size="md">
                        {t("companies.label")}
                    </Heading>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={10}
                    >
                        {data?.data?.length
                            ? (data?.data).map((company) => {
                                  return (
                                      <CompanyCard
                                          key={company.id}
                                          company={company}
                                      />
                                  );
                              })
                            : null}
                    </SimpleGrid>
                    <Pagination
                        currentPage={data?.pagination?.currentPage || 1}
                        totalPage={data?.pagination?.totalPages || 10}
                    />
                </Container>
            </Box>
        </MainTemPlate>
    );
};

export default Companies;
