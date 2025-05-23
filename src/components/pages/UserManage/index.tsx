import {
    Box,
    Button,
    Grid,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { UserResponseType } from "../../../types/user";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import ManagerTemplate from "../../templates/ManagerTemplate";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks";
import { getAxiosError } from "../../../libs/axios";
import toast from "../../../libs/toast";
import { useCreateUser } from "../../../services/user/create";
import { useDeleteUser } from "../../../services/user/delete";
import { useGetUsers } from "../../../services/user/get-users";
import { useUpdateUser } from "../../../services/user/update";
import ActionManage from "../../molecules/ActionMAnage";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../molecules/Pagination";

const UserManage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const page = useMemo(
        () => Number(searchParams.get("page")) || 1,
        [searchParams]
    );
    const pageSize = useMemo(
        () => Number(searchParams.get("pageSize")) || 10,
        [searchParams]
    );
    const user = useAppSelector((state) => state.user);
    const isAdmin = useMemo(() => user?.role === "admin", [user]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const {
        isOpen: isOpenNew,
        onOpen: onOpenNew,
        onClose: onCloseNew,
    } = useDisclosure();

    const [idDelete, setIdDelete] = useState(0);
    const [dataUpdate, setDataUpdate] = useState<UserResponseType>();
    const [newUser, setNewUser] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    const { data, refetch } = useGetUsers({
        nest: {
            company_id: user?.role === "company" ? user.company_id : 0,
            isUnActive: user?.role === "company" && !user.company_id,
            page: page,
            pageSize: pageSize,
        },
    });
    const users = useMemo(
        () =>
            (data?.data || []).map((item) => {
                return {
                    ...item,
                    action: (
                        <ActionManage
                            actionDelete={
                                item?.role === "admin"
                                    ? undefined
                                    : () => {
                                          setIdDelete(item.id);
                                          onOpenDelete();
                                      }
                            }
                            actionUpdate={
                                item?.role === "admin"
                                    ? undefined
                                    : () => {
                                          setDataUpdate(item);
                                          onOpen();
                                      }
                            }
                        />
                    ),
                };
            }),
        [data]
    );

    const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteUser({
        mutationConfig: {
            onSuccess() {
                onCloseDelete();
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
    const handleDelete = useCallback(
        () => mutateDelete(idDelete),
        [idDelete, mutateDelete]
    );

    const { mutate, isPending } = useUpdateUser({
        mutationConfig: {
            onSuccess() {
                onClose();
                refetch();
                toast({
                    status: "success",
                    title: "Cập nhật thành công",
                });
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const { mutate: mutateCreate } = useCreateUser({
        mutationConfig: {
            onSuccess() {
                onCloseNew();
                refetch();
                toast({
                    status: "success",
                    title: "Tạo thành công",
                });
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });
    const handleCreateUser = useCallback(() => {
        if (
            !newUser.name ||
            !newUser.email ||
            !newUser.password ||
            !newUser.confirmPassword
        ) {
            toast({
                status: "warning",
                title: "Vui lòng điền đủ thông tin",
            });
            return;
        }
        if (newUser.password !== newUser.confirmPassword) {
            toast({
                status: "warning",
                title: "Mật khẩu không khớp nhau",
            });
        }
        mutateCreate({
            ...newUser,
            full_name: newUser.name,
            company_id: user?.company_id,
        });
    }, [newUser, user?.company_id, mutateCreate]);

    return (
        <ManagerTemplate>
            <Box px={5}>
                <TitleManage title={t("userManage.title")} />
                <HStack justifyContent="end" mb={2}>
                    {user?.role === "company" && user.company_id ? (
                        <Button
                            onClick={() => {
                                onOpenNew();
                            }}
                        >
                            New
                        </Button>
                    ) : null}
                </HStack>
                <TableCommon
                    columns={[
                        { key: "full_name", label: "Tên", w: "20%" },
                        { key: "email", label: "Email", w: "20%" },
                        { key: "phone", label: "Số điẹn thoại", w: "20%" },
                        {
                            key: "gender",
                            label: "Giới tính",
                            w: "20%",
                        },
                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={users}
                />
                <Pagination
                    currentPage={data?.pagination?.currentPage || 1}
                    totalPage={data?.pagination?.totalPages || 10}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>User detail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                <FormCommon title="Tên">
                                    {isAdmin ? (
                                        <Input
                                            value={dataUpdate?.full_name}
                                            disabled
                                        />
                                    ) : (
                                        <Input
                                            value={dataUpdate?.full_name}
                                            onChange={(e) => {
                                                setDataUpdate((prev) => {
                                                    if (!prev) return undefined;
                                                    return {
                                                        ...prev,
                                                        name:
                                                            e.target.value ||
                                                            "",
                                                    };
                                                });
                                            }}
                                        />
                                    )}
                                </FormCommon>
                                <FormCommon title="Email">
                                    {isAdmin ? (
                                        <Input
                                            value={dataUpdate?.email}
                                            disabled
                                        />
                                    ) : (
                                        <Input
                                            value={dataUpdate?.email}
                                            onChange={(e) => {
                                                setDataUpdate((prev) => {
                                                    if (!prev) return undefined;
                                                    return {
                                                        ...prev,
                                                        email:
                                                            e.target.value ||
                                                            "",
                                                    };
                                                });
                                            }}
                                        />
                                    )}
                                </FormCommon>
                                <FormCommon title="Số điện thoại">
                                    {isAdmin ? (
                                        <Input
                                            value={dataUpdate?.phone}
                                            disabled
                                        />
                                    ) : (
                                        <Input
                                            value={dataUpdate?.phone}
                                            onChange={(e) => {
                                                setDataUpdate((prev) => {
                                                    if (!prev) return undefined;
                                                    return {
                                                        ...prev,
                                                        phone:
                                                            e.target.value ||
                                                            "",
                                                    };
                                                });
                                            }}
                                        />
                                    )}
                                </FormCommon>
                                <FormCommon title="Giới tính">
                                    {isAdmin ? (
                                        <Text>{dataUpdate?.gender}</Text>
                                    ) : (
                                        <RadioGroup
                                            onChange={(e) => {
                                                setDataUpdate((prev) => {
                                                    if (!prev) return undefined;
                                                    return {
                                                        ...prev,
                                                        gender: e || "",
                                                    };
                                                });
                                            }}
                                            value={dataUpdate?.gender}
                                        >
                                            <Stack direction="row">
                                                <Radio value="male">Nam</Radio>
                                                <Radio value="female">Nữ</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    )}
                                </FormCommon>

                                {isAdmin ? (
                                    <FormCommon title="Role">
                                        <Select
                                            placeholder="chon role"
                                            value={dataUpdate?.role}
                                            onChange={(e) => {
                                                setDataUpdate((prev) => {
                                                    return {
                                                        ...prev,
                                                        role:
                                                            e.target.value ||
                                                            "",
                                                    };
                                                });
                                            }}
                                        >
                                            <option value="company">
                                                Company
                                            </option>
                                            <option value="recruiter">
                                                Recruiter
                                            </option>
                                            <option value="applicant">
                                                Applicant
                                            </option>
                                        </Select>
                                    </FormCommon>
                                ) : null}
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                variant="ghost"
                                disabled={isPending}
                                onClick={() =>
                                    mutate({
                                        ...dataUpdate,
                                        full_name: dataUpdate.name,
                                    })
                                }
                            >
                                Lưu thay đổi
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isOpenNew} onClose={onCloseNew} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>User New</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                <FormCommon title="Tên">
                                    <Input
                                        value={newUser.name}
                                        onChange={(e) => {
                                            setNewUser((prev) => ({
                                                ...prev,
                                                name: e.target.value || "",
                                            }));
                                        }}
                                    />
                                </FormCommon>
                                <FormCommon title="Email">
                                    <Input
                                        value={newUser.email}
                                        onChange={(e) => {
                                            setNewUser((prev) => ({
                                                ...prev,
                                                email: e.target.value || "",
                                            }));
                                        }}
                                    />
                                </FormCommon>
                                <FormCommon title="Mật khẩu">
                                    <Input
                                        value={newUser.password}
                                        onChange={(e) => {
                                            setNewUser((prev) => ({
                                                ...prev,
                                                password: e.target.value || "",
                                            }));
                                        }}
                                    />
                                </FormCommon>
                                <FormCommon title="xác nhận mật khẩu">
                                    <Input
                                        value={newUser.confirmPassword}
                                        onChange={(e) => {
                                            setNewUser((prev) => ({
                                                ...prev,
                                                confirmPassword:
                                                    e.target.value || "",
                                            }));
                                        }}
                                    />
                                </FormCommon>
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost" onClick={handleCreateUser}>
                                Tạo
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Xác nhận xóa User"
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

export default UserManage;

type FormCommonProps = {
    children: ReactNode;
    title: string;
};
const FormCommon = ({ title, children }: FormCommonProps) => {
    return (
        <Box>
            <HStack justifyContent="space-between">
                <Text
                    fontSize={16}
                    fontWeight={500}
                    mb={1}
                    textTransform="capitalize"
                >
                    {title}
                </Text>
            </HStack>
            {children}
        </Box>
    );
};
