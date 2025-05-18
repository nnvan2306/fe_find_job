import {
    Avatar,
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    Icon,
    Tag,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { CompanyResponseType } from "../../../types/company";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { FiCheck } from "react-icons/fi";

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

export default JobCard;
