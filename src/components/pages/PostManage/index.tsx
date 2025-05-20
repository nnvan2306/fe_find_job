import {
    Box,
    Button,
    Grid,
    GridItem,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import { ReactNode, useCallback, useMemo, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { useAppSelector } from "../../../app/hooks";
import { getAxiosError } from "../../../libs/axios";
import toast from "../../../libs/toast";
import { useGetCategoris } from "../../../services/category/get-all";
import { useCreateJobPost } from "../../../services/job_post/create";
import { useDeleteJobPost } from "../../../services/job_post/delete";
import { useGetJobPosts } from "../../../services/job_post/get-job-posts";
import { useUpdateJobPost } from "../../../services/job_post/update";
import TitleManage from "../../atoms/TitleManage";
import ActionManage from "../../molecules/ActionMAnage";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import TableCommon from "../../organisms/TableCommon";
import ManagerTemplate from "../../templates/ManagerTemplate";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const defaultValue = {
    company_id: 0,
    recruiter_id: 0,
    title: "",
    salary_range: "",
    location: "",
    required_skills: "",
    category_id: 0,
    status: "active",
    description: "",
};
const PostManage = () => {
    const user = useAppSelector((state) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const [idDelete, setIdDelete] = useState(0);
    const [text, setText] = useState("");
    const [formData, setFormData] = useState(defaultValue);

    const { data: cateData } = useGetCategoris({});

    const { data, refetch } = useGetJobPosts({});
    const jobPosts = useMemo(
        () =>
            (data?.data || []).map((item) => ({
                ...item,
                cate: item?.category?.name || "",
                action: (
                    <ActionManage
                        actionDelete={() => {
                            setIdDelete(item.id);
                            onOpenDelete();
                        }}
                        actionUpdate={
                            user?.role !== "admin"
                                ? () => {
                                    setFormData(item);
                                    setText(item?.description);
                                    onOpen();
                                }
                                : undefined
                        }
                    />
                ),
            })),
        [data]
    );

    const { mutate, isPending } = useCreateJobPost({
        mutationConfig: {
            onSuccess() {
                refetch();
                onClose();
                toast({
                    title: "Tạo tin tuyển dụng thành công",
                    status: "success",
                });
            },
            onError(error) {
                toast({
                    title: getAxiosError(error),
                    status: "error",
                });
            },
        },
    });

    const { mutate: updatePost, isPending: isPendingUpdate } = useUpdateJobPost(
        {
            mutationConfig: {
                onSuccess() {
                    refetch();
                    onClose();
                    toast({
                        title: "Cập nhật tin tuyển dụng thành công",
                        status: "success",
                    });
                },
                onError(error) {
                    toast({
                        title: getAxiosError(error),
                        status: "error",
                    });
                },
            },
        }
    );

    const handleReset = () => {
        setFormData(defaultValue);
    };

    const handleSubmit = useCallback(() => {
        if (
            !formData.title ||
            !formData.salary_range ||
            !formData.description ||
            !formData.location ||
            !formData.required_skills ||
            !formData.category_id
        ) {
            toast({
                status: "warning",
                title: "Vui lòng điền đủ thông tin ",
            });
            return;
        }
        if (user?.company_id && user.id) {
            console.log("lot vao day: ", formData.id)
            if (formData?.id) {
                updatePost({
                    ...formData,
                    company_id: user.company_id,
                    recruiter_id: user.id,
                    id: formData.id,
                });
            } else {
                mutate({
                    ...formData,
                    company_id: user.company_id,
                    recruiter_id: user.id,
                });
            }
        }
    }, [user, formData]);

    const { mutate: deletePost, isPending: isPendingDelete } = useDeleteJobPost(
        {
            mutationConfig: {
                onSuccess() {
                    refetch();
                    onCloseDelete();
                    toast({
                        title: "Xóa tin tuyển dụng thành công",
                        status: "success",
                    });
                },
                onError(error) {
                    toast({
                        title: getAxiosError(error),
                        status: "error",
                    });
                },
            },
        }
    );

    const handleDelete = useCallback(
        () => deletePost(idDelete),
        [idDelete, deletePost]
    );

    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title={"Quản lý tin tuyển dụng"} />

                {(user?.role === "company" || user?.role === "recruiter") &&
                    user.company_id ? (
                    <HStack justifyContent="end" mb={2}>
                        <Button
                            onClick={() => {
                                setText("");
                                setFormData(defaultValue);
                                onOpen();
                            }}
                        >
                            New
                        </Button>
                    </HStack>
                ) : null}

                <TableCommon
                    columns={[
                        { key: "title", label: "title", w: "40%" },
                        { key: "cate", label: "Category", w: "40%" },
                        { key: "required_skills", label: "Skills", w: "40%" },
                        { key: "status", label: "status", w: "20%" },
                        { key: "action", label: "", w: "40%" },
                    ]}
                    data={jobPosts}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Job Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid
                                templateColumns={{
                                    base: "repeat(1, 1fr)",
                                    md: "repeat(2, 1fr)",
                                }}
                                gap={8}
                            >
                                <FormCommon title="Title">
                                    <Input
                                        placeholder="Title job post...."
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                            }))
                                        }
                                    />
                                </FormCommon>

                                <FormCommon title="Salary range">
                                    <Input
                                        placeholder="salary range...."
                                        value={formData.salary_range}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                salary_range: e.target.value,
                                            }))
                                        }
                                    />
                                </FormCommon>

                                <FormCommon title="Location">
                                    <Input
                                        placeholder="salary range...."
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                location: e.target.value,
                                            }))
                                        }
                                    />
                                </FormCommon>

                                <FormCommon title="Skill">
                                    <Input
                                        placeholder="skill...."
                                        value={formData.required_skills}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                required_skills: e.target.value,
                                            }))
                                        }
                                    />
                                </FormCommon>

                                <FormCommon title="Category">
                                    <Select
                                        value={formData.category_id}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                category_id: Number(
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                        placeholder="Choose category"
                                    >
                                        {cateData?.data?.length
                                            ? (cateData?.data || []).map(
                                                (item) => {
                                                    return (
                                                        <option
                                                            value={item.id}
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                }
                                            )
                                            : null}
                                    </Select>
                                </FormCommon>

                                <FormCommon title="Status">
                                    <Select
                                        defaultValue="active"
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                status: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="closed">Closed</option>
                                    </Select>
                                </FormCommon>

                                <GridItem colSpan={2}>
                                    <FormCommon title="content">
                                        <MdEditor
                                            placeholder="Write description job post...."
                                            style={{ height: "500px" }}
                                            renderHTML={(text) =>
                                                mdParser.render(text)
                                            }
                                            onChange={(e) => {
                                                setText(e.text);
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    description: e.text,
                                                }));
                                            }}
                                            value={text}
                                        />
                                    </FormCommon>
                                </GridItem>
                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    onClose();
                                    handleReset();
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleSubmit}
                                disabled={isPending}
                            >
                                {formData?.id ? "Lưu" : "Tạo"}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Confirm xóa User"
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

export default PostManage;

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
