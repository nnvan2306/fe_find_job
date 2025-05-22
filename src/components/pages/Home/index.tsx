import {
    Box,
    Button,
    Container,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useGetCategoris } from "../../../services/category/get-all";
import { useGetJobPosts } from "../../../services/job_post/get-job-posts";
import JobCard from "../../organisms/JobCard";
import Pagination from "../../molecules/Pagination";

const Home = () => {
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
    const category_id = useMemo(
        () => searchParams.get("category_id") || 0,
        [searchParams]
    );

    const handleSearch = () => {
        setSearchParams({ search: textSearch });
    };

    const { data } = useGetCategoris({});
    const categories = useMemo(
        () =>
            (data?.data || []).map((item) => ({
                ...item,
            })),
        [data]
    );

    const { data: jobData } = useGetJobPosts({
        nest: {
            category_id: Number(category_id),
            search: text,
            page: page,
            pageSize: pageSize,
        },
    });

    return (
        <MainTemPlate>
            <Box w="100%">
                <Box bg="green.600" py={5} px={4} w="100%">
                    <Container maxW="container.xl" w="100%">
                        <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap" }}>
                            <InputGroup flex={{ base: "1 0 100%", md: 2 }}>
                                <InputLeftElement pointerEvents="none">
                                    <FiSearch color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder={t("home.placeholder")}
                                    bg="white"
                                    value={textSearch}
                                    onChange={(e) =>
                                        setTextSearch(e.target.value)
                                    }
                                />
                            </InputGroup>

                            <Button
                                colorScheme="green"
                                px={10}
                                flex={{ base: "1 0 100%", md: "0 0 auto" }}
                                onClick={handleSearch}
                            >
                                {t("buttons.search")}
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
                            width={{ base: "100%", md: "300px" }}
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
                                        {t("home.sort")}
                                    </Text>
                                    <Button
                                        variant="link"
                                        colorScheme="green"
                                        size="sm"
                                        onClick={() =>
                                            setSearchParams({
                                                category_id: "",
                                            })
                                        }
                                    >
                                        {t("home.deleteCate")}
                                    </Button>
                                </Flex>
                            </Box>

                            <Select
                                placeholder={t("home.selectCategory")}
                                value={Number(category_id)}
                                onChange={(e) =>
                                    setSearchParams({
                                        category_id: e.target.value,
                                    })
                                }
                            >
                                {categories?.length
                                    ? categories.map((item) => {
                                          return (
                                              <option
                                                  key={item.id}
                                                  value={item.id}
                                              >
                                                  {item?.name}
                                              </option>
                                          );
                                      })
                                    : null}
                            </Select>
                        </Box>

                        <Box flex="1">
                            <Box mb={4}>
                                {/* <Flex
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
                                </Flex> */}
                            </Box>

                            <Box>
                                {jobData?.data?.length
                                    ? (jobData?.data || []).map((job) => (
                                          <JobCard key={job.id} job={job} />
                                      ))
                                    : null}
                            </Box>
                            <Pagination
                                currentPage={
                                    jobData?.pagination?.currentPage || 1
                                }
                                totalPage={
                                    jobData?.pagination?.totalPages || 10
                                }
                            />
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </MainTemPlate>
    );
};

export default Home;
