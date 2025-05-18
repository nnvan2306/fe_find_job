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
import ManagerTemplate from "../../templates/ManagerTemplate";
import TableCommon from "../../organisms/TableCommon";
import TitleManage from "../../atoms/TitleManage";
import { ReactNode, useState } from "react";
import { UserResponseType } from "../../../types/user";

import { useTranslation } from "react-i18next";

const UserManage = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    const isAdmin = true;

    return (
        <ManagerTemplate>
            <Box px={5}>
                <TitleManage title={t("userManage.title")} />
                <HStack justifyContent="end">
                    <Button
                        onClick={() => {
                            onOpenNew();
                        }}
                    >
                        New
                    </Button>
                </HStack>
                <TableCommon
                    columns={[
                        { key: "name", label: "Name", w: "20%" },
                        { key: "email", label: "Email", w: "20%" },
                        { key: "phone", label: "Phone", w: "20%" },
                        {
                            key: "gender",
                            label: "Gender",
                            w: "20%",
                        },
                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={[]}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>User detail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                <FormCommon title="Name">
                                    {isAdmin ? (
                                        <Input
                                            value={dataUpdate?.name}
                                            disabled
                                        />
                                    ) : (
                                        <Input
                                            value={dataUpdate?.name}
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
                                <FormCommon title="Phone">
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

                                <FormCommon title="Giới tính">
                                    {isAdmin ? (
                                        <Select placeholder="chon role"></Select>
                                    ) : null}
                                </FormCommon>
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost" onClick={() => {}}>
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
                                <FormCommon title="Name">
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
                                <FormCommon title="Password">
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
                                <FormCommon title="Confirm Password">
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
                            <Button variant="ghost" onClick={() => {}}>
                                Lưu thay đổi
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* <ConfirmDelete
                    header="Confirm xóa User"
                    title="Bạn chắc chắn muốn xóa?, hành động này không thể khôi phục."
                    isOpen={isOpenDelete}
                    onOpen={onOpenDelete}
                    onClose={onCloseDelete}
                    onDelete={handleDelete}
                    isLoading={isPendingDelete}
                /> */}
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
