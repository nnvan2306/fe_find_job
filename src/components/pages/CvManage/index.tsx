import React, { useState } from "react";
import {
    Box,
    Flex,
    Text,
    Heading,
    Button,
    Grid,
    GridItem,
    Switch,
    Badge,
    useColorModeValue,
    Avatar,
    Icon,
    HStack,
    VStack,
    Divider,
    IconButton,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
} from "@chakra-ui/react";
import {
    FiPlus,
    FiStar,
    FiDownload,
    FiTrash2,
    FiCheckCircle,
} from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";
import ModalNewCv, { CVFormData } from "../../organisms/ModalNewCv";
import icons from "../../../constants/icons";

interface CVCardProps {
    title: string;
    isMain?: boolean;
    lastUpdated: string;
    onSetMain?: () => void;
    onDownload?: () => void;
    onDelete?: () => void;
    onShow: () => void;
    onEdit: () => void;
}

const CVCard: React.FC<CVCardProps> = ({
    title,
    isMain = false,
    lastUpdated,
    onSetMain,
    onDownload,
    onDelete,
    onShow,
    onEdit,
}) => {
    const cardBg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.800", "white");
    const footerBg = useColorModeValue("gray.100", "gray.600");

    return (
        <Card
            bg={cardBg}
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
            position="relative"
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                h="40px"
                bg="gray.200"
            />
            <CardHeader pt={12} pb={3}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold" fontSize="xl" color={textColor}>
                        {title}
                    </Text>
                    {isMain && (
                        <Badge
                            colorScheme="yellow"
                            display="flex"
                            alignItems="center"
                            px={2}
                            py={1}
                            borderRadius="md"
                        >
                            <Icon as={FiStar} mr={1} />
                            CV chính
                        </Badge>
                    )}
                    {!isMain && (
                        <Button
                            size="sm"
                            colorScheme="blue"
                            rightIcon={<FiStar />}
                            onClick={onSetMain}
                        >
                            Đặt làm CV chính
                        </Button>
                    )}
                </Flex>
            </CardHeader>
            <CardBody py={2}>
                <Text fontSize="sm" color="gray.500">
                    Cập nhật lần cuối {lastUpdated}
                </Text>
            </CardBody>
            <CardFooter
                bg={footerBg}
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                pb={2}
            >
                <Button variant="ghost" size="sm" onClick={onShow}>
                    <Icon as={icons.eye} fontSize={20} />
                </Button>
                <HStack spacing={2}>
                    <IconButton
                        aria-label="Share"
                        icon={<Icon as={icons.pen} />}
                        variant="ghost"
                        size="sm"
                        onClick={onEdit}
                    />
                    <IconButton
                        aria-label="Download"
                        icon={<FiDownload />}
                        variant="ghost"
                        size="sm"
                        onClick={onDownload}
                    />
                    <IconButton
                        aria-label="Delete"
                        icon={<FiTrash2 />}
                        variant="ghost"
                        size="sm"
                        onClick={onDelete}
                    />
                </HStack>
            </CardFooter>
        </Card>
    );
};

const CvManage: React.FC = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dataModal, setDataModal] = useState<CVFormData | null>(null);

    const data = [
        {
            id: 1,
            user_id: 1,
            title: "Ngo Ngoc Van",
            required_skills: "",
            file_url: "react,nest,git",
            is_active: true,
            is_shared: false,
        },
        {
            id: 2,
            user_id: 1,
            title: "Ngo Ngoc Van two",
            required_skills: "",
            file_url: "node,next",
            is_active: false,
            is_shared: false,
        },
    ];

    const handleClose = () => {
        setDataModal(null);
        onClose();
    };

    return (
        <MainTemPlate>
            <Box bg={bgColor} minH="100vh" p={4}>
                <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={6}>
                    <GridItem>
                        <Box
                            bg="white"
                            p={6}
                            borderRadius="lg"
                            boxShadow="sm"
                            mb={6}
                            border="1px"
                            borderColor={borderColor}
                        >
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                mb={6}
                            >
                                <Heading
                                    fontSize={{
                                        base: "md",
                                        md: "lg",
                                        lg: "xl",
                                    }}
                                >
                                    CV đã tạo trên Find Job
                                </Heading>

                                <Button
                                    leftIcon={<FiPlus />}
                                    colorScheme="green"
                                    size="md"
                                    onClick={onOpen}
                                >
                                    Tạo mới
                                </Button>
                            </Flex>

                            <Grid
                                templateColumns={{
                                    base: "1fr",
                                    md: "repeat(2, 1fr)",
                                }}
                                gap={6}
                            >
                                {data?.length
                                    ? data.map((item) => {
                                          return (
                                              <CVCard
                                                  key={item.id}
                                                  title={item.title}
                                                  isMain={item.is_active}
                                                  lastUpdated="06-05-2025 23:22 PM"
                                                  onShow={() => {}}
                                                  onEdit={() => {
                                                      setDataModal(item);
                                                      onOpen();
                                                  }}
                                                  onDownload={() =>
                                                      console.log(
                                                          "Download main CV"
                                                      )
                                                  }
                                                  onDelete={() =>
                                                      console.log(
                                                          "Delete main CV"
                                                      )
                                                  }
                                              />
                                          );
                                      })
                                    : null}
                            </Grid>
                        </Box>
                    </GridItem>

                    <GridItem>
                        <Box
                            bg="white"
                            p={6}
                            borderRadius="lg"
                            boxShadow="sm"
                            border="1px"
                            borderColor={borderColor}
                        >
                            <VStack spacing={4} align="stretch">
                                <HStack justifyContent="space-between">
                                    <HStack>
                                        <Avatar
                                            size="md"
                                            name="Văn Ngô ngọc"
                                            src=""
                                            bg="gray.300"
                                        />
                                        <Box>
                                            <Text fontWeight="medium">
                                                Chào bạn trở lại,
                                            </Text>
                                            <Text fontWeight="bold">
                                                Văn Ngô ngọc
                                            </Text>
                                        </Box>
                                    </HStack>
                                    <Icon
                                        as={FiCheckCircle}
                                        color="green.500"
                                        boxSize={6}
                                    />
                                </HStack>

                                <Divider my={2} />

                                <Box>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        mb={2}
                                    >
                                        <Text
                                            fontWeight="bold"
                                            color="green.500"
                                        >
                                            Trạng thái tìm việc đang bật
                                        </Text>
                                        <Switch
                                            defaultChecked
                                            colorScheme="green"
                                            size="md"
                                        />
                                    </Flex>
                                    <Text fontSize="sm" color="gray.600">
                                        Trạng thái Bật tìm việc sẽ tự động tắt
                                        sau 4 ngày.
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        Nếu bạn vẫn còn nhu cầu tìm việc, hãy{" "}
                                        <Text
                                            as="span"
                                            color="green.500"
                                            fontWeight="medium"
                                        >
                                            Bật tìm việc trở lại
                                        </Text>
                                    </Text>
                                </Box>

                                {/* <Box
                                    mt={2}
                                    p={2}
                                    bg="gray.50"
                                    borderRadius="md"
                                >
                                    <Text fontWeight="medium">
                                        1 CV đang được chọn
                                    </Text>
                                    <Button
                                        variant="link"
                                        colorScheme="blue"
                                        size="sm"
                                    >
                                        Thay đổi
                                    </Button>
                                </Box>

                                <Box mt={2}>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        mb={2}
                                    >
                                        <Text
                                            fontWeight="medium"
                                            color="green.500"
                                        >
                                            Cho phép NTD tìm kiếm hồ sơ
                                        </Text>
                                        <Switch
                                            defaultChecked
                                            colorScheme="green"
                                            size="md"
                                        />
                                    </Flex>
                                    <Text fontSize="sm" color="gray.600">
                                        Khi có cơ hội việc làm phù hợp, NTD sẽ
                                        liên hệ và trao đổi với bạn qua:
                                    </Text>
                                </Box> */}
                            </VStack>
                        </Box>
                    </GridItem>
                </Grid>

                <ModalNewCv
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSave={() => {}}
                    data={dataModal}
                    isLoading={false}
                />
            </Box>
        </MainTemPlate>
    );
};

export default CvManage;
