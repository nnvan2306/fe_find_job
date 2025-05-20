import {
    Box,
    Button,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import { useGetCategoris } from "../../../services/category/get-all";
import { useEffect, useMemo, useState } from "react";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import { useCreateCategory } from "../../../services/category/create";
import toast from "../../../libs/toast";
import { getAxiosError } from "../../../libs/axios";
import { useUpdateCategory } from "../../../services/category/update";
import { useDeleteCategory } from "../../../services/category/delete";
import { useTranslation } from "react-i18next";
import { CategoryResponseType } from "../../../types/category";
import ActionManage from "../../molecules/ActionMAnage";

const CategoryManage = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const [idDelete, setIdDelete] = useState(0);
    const [name, setName] = useState("");
    const [dataUpdate, setDataUpdate] = useState<CategoryResponseType | null>(
        null
    );

    const { data, refetch } = useGetCategoris({});
    const categories = useMemo(
        () =>
            (data?.data || []).map((item: CategoryResponseType) => ({
                ...item,
                action: (
                    <ActionManage
                        actionDelete={() => {
                            setIdDelete(item.id);
                            onOpenDelete();
                        }}
                        actionUpdate={() => {
                            setDataUpdate(item);
                            onOpen();
                        }}
                    />
                ),
            })),
        [data]
    );

    const { mutate, isPending } = useCreateCategory({
        mutationConfig: {
            onSuccess() {
                setName("");
                onClose();
                toast({
                    status: "success",
                    title: "Tạo danh mục thành công",
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

    const { mutate: update, isPending: isPendingUpdate } = useUpdateCategory({
        mutationConfig: {
            onSuccess() {
                setName("");
                setDataUpdate(null);
                onClose();
                toast({
                    status: "success",
                    title: "Cập nhật danh mục thành công",
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

    const { mutate: deleteCategory, isPending: isPendingDelete } =
        useDeleteCategory({
            mutationConfig: {
                onSuccess() {
                    onCloseDelete();
                    toast({
                        status: "success",
                        title: "Xóa danh mục thành công",
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

    const handleDelete = () => {
        if (idDelete) {
            deleteCategory(idDelete);
        }
    };

    const handleSubmit = () => {
        if (!name) {
            toast({
                status: "warning",
                title: "Vui lòng nhập title",
            });
            return;
        }
        if (dataUpdate) {
            update({ ...dataUpdate, name: name });
        } else {
            mutate({ name });
        }
    };

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
        } else {
            setName("");
        }
    }, [dataUpdate]);

    return (
        <ManagerTemplate>
            {/* <LoadingOverlay isLoading={isLoading} /> */}
            <Box>
                <TitleManage title={"Categories"} />
                <HStack justifyContent="end" mb={2}>
                    <Button
                        onClick={() => {
                            onOpen();
                            setDataUpdate(null);
                        }}
                    >
                        {t("buttons.new")}
                    </Button>
                </HStack>

                <TableCommon
                    columns={[
                        { key: "name", label: "Name", w: "50%" },

                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={categories}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {dataUpdate ? "Category Detail" : "New Category"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box w="100%">
                                <Text>Name</Text>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    onClose();
                                    if (dataUpdate) {
                                        setDataUpdate(null);
                                        setName("");
                                    }
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleSubmit}
                                disabled={isPending || isPendingUpdate}
                            >
                                {" "}
                                {dataUpdate ? "Lưu thay đổi" : "Tạo"}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Confirm xóa Category"
                    title="Bạn chắc chắn muốn xóa?, hành động này không thể khôi phục."
                    isOpen={isOpenDelete}
                    onOpen={onOpenDelete}
                    onClose={onCloseDelete}
                    onDelete={handleDelete}
                    isLoading={isPendingDelete}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default CategoryManage;
