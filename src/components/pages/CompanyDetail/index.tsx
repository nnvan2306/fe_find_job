import React, { useMemo } from "react";
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
import { useParams } from "react-router-dom";
import { useGetCompany } from "../../../services/company/get-company";
import Markdown from "react-markdown";
import { useGetJobPosts } from "../../../services/job_post/get-job-posts";
import { useTranslation } from "react-i18next";

const CompanyDetail: React.FC = () => {
    const { t } = useTranslation();
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const headerBgColor = useColorModeValue("green.500", "green.600");
    const secondaryBgColor = useColorModeValue("green.50", "green.900");

    const { id } = useParams();
    const { data } = useGetCompany({ id: Number(id) || 0 });
    const companyData = useMemo(() => data?.data, [data]);

    const { data: jobData } = useGetJobPosts({
        nest: { company_id: Number(id) || 0 },
    });
    const jobs = useMemo(() => jobData?.data || [], [jobData]);

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
                                src={companyData?.logo_url || ""}
                                fallbackSrc="https://via.placeholder.com/80"
                                alt={"logo"}
                                objectFit="contain"
                            />
                        </Box>
                        <Box>
                            <Heading size="md" mb={2}>
                                {companyData?.name || ""}
                            </Heading>
                            <Flex alignItems="center" mb={2}>
                                <Icon as={FaGlobe} mr={2} />
                                <Link
                                    href={companyData?.website || ""}
                                    isExternal
                                    color="white"
                                    fontSize="sm"
                                >
                                    {companyData?.website || ""}
                                </Link>
                            </Flex>
                            <Flex alignItems="center">
                                <Icon as={FaUsers} mr={2} />
                                <Text fontSize="sm">
                                    {companyData?.employeeCount || ""}{" "}
                                    {t("companyDetail.people")}
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
                                            {t("companyDetail.introduction")}
                                        </Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Markdown>
                                        {companyData?.description || ""}
                                    </Markdown>
                                    {/* <Text mb={4}>
                                        {companyData.description}
                                    </Text> */}
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
                                {t("companyDetail.contact")}
                            </Heading>
                        </Box>

                        <Box borderRadius="md" overflow="hidden" mb={4}>
                            <HStack mb={3}>
                                <Icon
                                    as={MdLocationOn}
                                    fontSize={20}
                                    color={"green"}
                                />
                                <Text> {t("companyDetail.address")}</Text>
                            </HStack>
                            <Text>{companyData?.location || ""}</Text>
                        </Box>
                        <Divider my={2} />
                        <Box borderRadius="md" overflow="hidden" mb={4}>
                            <HStack mb={3}>
                                <Icon
                                    as={FaMap}
                                    fontSize={20}
                                    color={"green"}
                                />
                                <Text> {t("companyDetail.map")}</Text>
                            </HStack>
                            <GoogleMap address={companyData?.location || ""} />
                        </Box>
                    </Box>
                </Flex>

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
                            {t("companyDetail.recruitment")}
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
