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
import ManagerTemplate from "../../templates/ManagerTemplate";
import TableCommon from "../../organisms/TableCommon";
import { ReactNode, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import toast from "../../../libs/toast";
import TitleManage from "../../atoms/TitleManage";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const defaultValue = {
    company_id: 0,
    recruiter_id: 0,
    title: "",
    salary_range: "",
    location: "",
    required_skills: "",
    job_type: 0,
    status: "active",
    description: "",
};
const PostManage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [text, setText] = useState("");
    const [formData, setFormData] = useState(defaultValue);

    const handleReset = () => {
        setFormData(defaultValue);
    };

    const handleValidate = () => {
        const isInvalid = Object.entries(formData).some(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, value]) =>
                (typeof value === "string" && value.trim() === "") ||
                (typeof value === "number" && value === 0)
        );
        if (isInvalid) {
            toast({
                status: "warning",
                title: "Vui lòng nhập đủ thông tin",
            });
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }
    };

    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title={"Quản lý tin tuyển dụng"} />

                <HStack justifyContent="end" mb={2}>
                    <Button
                        onClick={() => {
                            onOpen();
                        }}
                    >
                        New
                    </Button>
                </HStack>
                <TableCommon
                    columns={[
                        { key: "title", label: "title", w: "40%" },
                        { key: "status", label: "status", w: "20%" },
                        { key: "action", label: "", w: "40%" },
                    ]}
                    data={[]}
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
                                        value={formData.job_type}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                job_type: Number(
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                    ></Select>
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
                                                    description: e.html,
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
                            <Button variant="ghost" onClick={handleSubmit}>
                                Tạo
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
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
