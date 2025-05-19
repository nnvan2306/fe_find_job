import { useState, useRef, ChangeEvent, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormHelperText,
    Flex,
    Text,
} from "@chakra-ui/react";
import { FiUpload, FiSave, FiX, FiFile } from "react-icons/fi";
import toast from "../../../libs/toast";
import { useUploadFile } from "../../../services/upload/upload";
import { getAxiosError } from "../../../libs/axios";

interface CreateCVModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CVFormData) => void;
    data: CVFormData | null;
    isLoading: boolean;
}

export interface CVFormData {
    title: string;
    required_skills: string;
    file_url: string;
    is_active: boolean;
    is_shared: boolean;
}

const ModalNewCv = ({
    isOpen,
    onClose,
    onSave,
    data,
    isLoading,
}: CreateCVModalProps) => {
    const [formData, setFormData] = useState<CVFormData>({
        title: "",
        required_skills: "",
        file_url: "",
        is_active: false,
        is_shared: false,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSwitchChange =
        (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [name]: e.target.checked,
            });
        };

    const { mutate, isPending } = useUploadFile({
        mutationConfig: {
            onSuccess(data) {
                setFormData((prev) => ({
                    ...prev,
                    file_url: data?.data || "",
                }));
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            mutate(formData);
        }
    };

    const handleSubmit = async () => {
        if (
            !formData.title ||
            !formData.required_skills ||
            !formData.file_url
        ) {
            toast({
                status: "warning",
                title: "Vui lòng điền đủ thông tin",
                description: "Please fill in all fields",
            });
            return;
        }

        onSave(formData);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleCancel = () => {
        setFormData({
            title: "",
            required_skills: "",
            file_url: "",
            is_active: true,
            is_shared: false,
        });
        onClose();
    };

    useEffect(() => {
        setFormData({
            title: "",
            required_skills: "",
            file_url: "",
            is_active: false,
            is_shared: false,
            ...data,
        });
    }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New CV</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter CV title"
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Required Skills</FormLabel>
                        <Textarea
                            name="required_skills"
                            value={formData.required_skills}
                            onChange={handleInputChange}
                            placeholder="Enter required skills separated by commas"
                            rows={4}
                        />
                        <FormHelperText>
                            List the skills required for this position
                        </FormHelperText>
                    </FormControl>

                    <FormControl mb={4} isRequired>
                        <FormLabel>Upload CV File</FormLabel>
                        <Input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            display="none"
                            accept=".pdf,.doc,.docx"
                        />
                        <Flex direction="column" gap={2}>
                            <Button
                                leftIcon={<FiUpload />}
                                onClick={triggerFileInput}
                                colorScheme="blue"
                                disabled={isPending}
                            >
                                Select File
                            </Button>
                            {formData.file_url && (
                                <Flex
                                    p={2}
                                    alignItems="center"
                                    bg="gray.100"
                                    borderRadius="md"
                                    justifyContent="space-between"
                                >
                                    <Flex alignItems="center">
                                        <FiFile />
                                        <Text ml={2}>{formData.file_url}</Text>
                                    </Flex>
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                file_url: "",
                                            });
                                        }}
                                    >
                                        <FiX />
                                    </Button>
                                </Flex>
                            )}
                        </Flex>
                        <FormHelperText>
                            Accepted formats: PDF, DOC, DOCX
                        </FormHelperText>
                    </FormControl>

                    {/* <Box mb={4}>
                        <Flex
                            direction="row"
                            justifyContent="space-between"
                            mb={4}
                        >
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="is_active" mb={0}>
                                    Active
                                </FormLabel>
                                <Switch
                                    id="is_active"
                                    isChecked={formData.is_active}
                                    onChange={handleSwitchChange("is_active")}
                                    colorScheme="green"
                                />
                            </FormControl>

                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="is_shared" mb={0}>
                                    Shared
                                </FormLabel>
                                <Switch
                                    id="is_shared"
                                    isChecked={formData.is_shared}
                                    onChange={handleSwitchChange("is_shared")}
                                    colorScheme="blue"
                                />
                            </FormControl>
                        </Flex>
                    </Box> */}
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={handleCancel}
                        leftIcon={<FiX />}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        leftIcon={<FiSave />}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalNewCv;
