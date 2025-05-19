import React, { useCallback, useMemo, useState } from "react";
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
import { useCreateCv } from "../../../services/cv/create";
import { useAppSelector } from "../../../app/hooks";
import toast from "../../../libs/toast";
import { getAxiosError } from "../../../libs/axios";
import { useGetCvs } from "../../../services/cv/get-cvs";
import { useDeleteCv } from "../../../services/cv/delete";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import { useUpdateCv } from "../../../services/cv/update";
import { useSetMainCv } from "../../../services/cv/set-main";
import { useSetShareCv } from "../../../services/cv/set-shared";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";

interface CVCardProps {
    title: string;
    isMain?: boolean;
    file_url: string;
    onSetMain?: () => void;
    onDownload?: () => void;
    onDelete?: () => void;
    onShow: () => void;
    onEdit: () => void;
}

const CVCard: React.FC<CVCardProps> = ({
    title,
    isMain = false,
    file_url,
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
                <iframe
                    src={file_url}
                    width="100%"
                    height="300px"
                    style={{ border: "none" }}
                />
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
const defaultValue = {
    title: "",
    required_skills: "",
    file_url: "",
    is_active: false,
    is_shared: false,
};
const CvManage: React.FC = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const [idDelete, setIdDelete] = useState(0);
    const [dataModal, setDataModal] = useState<CVFormData>(defaultValue);

    const { data: dataCvs, refetch } = useGetCvs({
        nest: { user_id: user?.id, isUnActive: user?.id ? false : true },
    });
    const cvs = useMemo(() => dataCvs?.data || [], [dataCvs]);
    const isShared = useMemo(
        () => (cvs || []).some((item) => item.is_shared),
        [cvs]
    );

    const handleClose = () => {
        setDataModal(defaultValue);
        onClose();
    };

    const { mutate } = useCreateCv({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Tạo Cv thành công",
                });
                setDataModal(defaultValue);
                onClose();
                refetch();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });
    const handleCreateCv = useCallback(
        (data: CVFormData) => {
            if (user?.id) {
                mutate({
                    ...data,
                    user_id: user?.id,
                });
            }
        },
        [user]
    );

    const { mutate: mutateUpdate } = useUpdateCv({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Cập nhật CV thành công",
                });
                refetch();
                onClose();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });
    const handleUpdateCv = useCallback(
        (data: CVFormData) => {
            if (user?.id) {
                mutateUpdate({
                    ...data,
                    user_id: user?.id,
                });
            }
        },
        [user]
    );

    const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteCv({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Xóa CV thành công",
                });
                refetch();
                onCloseDelete();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });
    const handleDeleteCv = useCallback(() => {
        console.log("run", idDelete);
        if (idDelete) {
            mutateDelete(idDelete);
        }
    }, [mutateDelete, idDelete]);

    const { mutate: mutateSetMain } = useSetMainCv({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Cập nhật CV thành công",
                });
                refetch();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });
    const handleSetMainCv = useCallback(
        (idCv: number) => {
            if (user?.id) {
                mutateSetMain({
                    id: user.id,
                    idCv,
                });
            }
        },
        [mutateSetMain, user?.id]
    );

    const { mutate: mutateSetShare } = useSetShareCv({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Bật tìm việc thành công",
                });
                refetch();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });
    const handleSetShareCv = useCallback(() => {
        if (!(cvs || []).find((item) => item.is_active)) {
            toast({
                status: "warning",
                title: "Vui lòng tạo CV chính",
            });
            return;
        }
        if (user?.id) {
            mutateSetShare({
                id: user.id,
            });
        }
    }, [mutateSetShare, user?.id, cvs]);

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
                                    onClick={
                                        user?.id
                                            ? onOpen
                                            : () => navigate(routesMap.Login)
                                    }
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
                                {cvs?.length
                                    ? cvs.map((item) => {
                                          return (
                                              <CVCard
                                                  key={item.id}
                                                  title={item.title}
                                                  file_url={item.file_url}
                                                  isMain={item.is_active}
                                                  lastUpdated="06-05-2025 23:22 PM"
                                                  onShow={() => {
                                                      window.open(
                                                          item.file_url,
                                                          "_blank"
                                                      );
                                                  }}
                                                  onEdit={() => {
                                                      setDataModal(item);
                                                      onOpen();
                                                  }}
                                                  onDownload={() =>
                                                      console.log(
                                                          "Download main CV"
                                                      )
                                                  }
                                                  onDelete={() => {
                                                      setIdDelete(item.id);
                                                      onOpenDelete();
                                                  }}
                                                  onSetMain={() =>
                                                      handleSetMainCv(item.id)
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
                                            isChecked={isShared}
                                            colorScheme="green"
                                            size="md"
                                            onChange={handleSetShareCv}
                                        />
                                    </Flex>
                                    <Text fontSize="sm" color="gray.600">
                                        Trạng thái Bật tìm việc sẽ tự động tắt
                                        sau 30 ngày.
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
                            </VStack>
                        </Box>
                    </GridItem>
                </Grid>

                <ModalNewCv
                    isOpen={isOpen}
                    onClose={handleClose}
                    onSave={dataModal.id ? handleUpdateCv : handleCreateCv}
                    data={dataModal}
                    isLoading={false}
                />

                <ConfirmDelete
                    header="Confirm xóa Cv"
                    title="Bạn chắc chắn muốn xóa?, hành động này không thể khôi phục."
                    isOpen={isOpenDelete}
                    onOpen={onOpenDelete}
                    onClose={onCloseDelete}
                    onDelete={handleDeleteCv}
                    isLoading={isPendingDelete}
                />
            </Box>
        </MainTemPlate>
    );
};

export default CvManage;
