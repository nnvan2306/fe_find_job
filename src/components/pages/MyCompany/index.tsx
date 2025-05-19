import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputLeftElement,
    InputGroup,
    VStack,
    HStack,
    Text,
    Image,
    Card,
    CardBody,
} from "@chakra-ui/react";
import {
    FiUpload,
    FiSave,
    FiGlobe,
    FiMapPin,
    FiUsers,
    FiInfo,
} from "react-icons/fi";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import ManagerTemplate from "../../templates/ManagerTemplate";
import { useUploadFile } from "../../../services/upload/upload";
import { getAxiosError } from "../../../libs/axios";
import { useCreateCompany } from "../../../services/company/create";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import toast from "../../../libs/toast";
import { useGetCompany } from "../../../services/company/get-company";
import { login } from "../../../store/features/user/userSlice";
import { useUpdateCompany } from "../../../services/company/update";

const mdParser = new MarkdownIt(/* Markdown-it options */);

interface Company {
    name: string;
    description: string;
    employeeCount: string;
    website: string;
    logo_url: string;
    location: string;
    owner_id: number;
    verified: boolean;
}

const MyCompany = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [text, setText] = useState("");
    const [company, setCompany] = useState<Company>({
        name: "",
        description: "",
        employeeCount: "",
        website: "",
        logo_url: "",
        location: "",
        owner_id: 0,
        verified: false,
    });

    const { data } = useGetCompany({ id: user?.company_id || 0 });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCompany((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { mutate, isPending } = useUploadFile({
        mutationConfig: {
            onSuccess(data) {
                setCompany((prev) => ({
                    ...prev,
                    logo_url: data?.data || "",
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

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            mutate(formData);
        }
    };

    const { mutate: createCompany, isPending: isCreating } = useCreateCompany({
        mutationConfig: {
            onSuccess(data) {
                if (user && data?.data?.id) {
                    dispatch(
                        login({
                            ...user,
                            company_id: data.data.id,
                        })
                    );
                }
                toast({
                    status: "success",
                    title: "Tạo công ty thành công",
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

    const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Cập nhật công ty thành công",
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

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (
                !company.name ||
                !company.description ||
                !company.employeeCount ||
                !company.location ||
                !company.website
            ) {
                toast({
                    title: "Thông tin thiếu",
                    description: "Vui lòng nhập đầy đủ thông tin",
                    status: "error",
                });
            }
            if (user?.id) {
                if (data?.data?.id) {
                    updateCompany({ ...company, id: data?.data?.id });
                } else {
                    createCompany({ ...company, owner_id: user?.id });
                }
            }
        },
        [company, user?.id, createCompany, data?.data?.id]
    );

    useEffect(() => {
        if (data) {
            setCompany(data?.data);
            setText(data?.data?.description);
        }
    }, [data]);

    return (
        <ManagerTemplate>
            <Box p={4} mx="auto" w="100%">
                <VStack spacing={8} align="stretch">
                    <form onSubmit={handleSubmit}>
                        <Card variant="outline" mb={6}>
                            <CardBody>
                                <VStack spacing={6} align="stretch">
                                    <Box textAlign="center">
                                        <Box
                                            w="150px"
                                            h="150px"
                                            bg="gray.100"
                                            borderRadius="md"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mx="auto"
                                        >
                                            {company.logo_url ? (
                                                <Image
                                                    alt="logo"
                                                    src={company.logo_url}
                                                    w="100%"
                                                    h="100%"
                                                    objectFit="contain"
                                                />
                                            ) : (
                                                <Text color="gray.400">
                                                    Logo công ty
                                                </Text>
                                            )}
                                        </Box>
                                    </Box>

                                    <FormControl>
                                        <FormLabel>Logo công ty</FormLabel>
                                        <Button
                                            leftIcon={<FiUpload />}
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "logo-upload"
                                                    )
                                                    ?.click()
                                            }
                                            w="full"
                                            colorScheme="blue"
                                            variant="outline"
                                            disabled={isPending}
                                        >
                                            Tải lên logo
                                        </Button>
                                        <Input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            display="none"
                                        />
                                        <FormHelperText>
                                            Định dạng hỗ trợ: JPG, PNG. Kích
                                            thước tối đa: 2MB
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Tên công ty</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <FiInfo />
                                            </InputLeftElement>
                                            <Input
                                                name="name"
                                                value={company.name}
                                                onChange={handleChange}
                                                placeholder="Nhập tên công ty"
                                                pl={10}
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <HStack spacing={4} align="start">
                                        <FormControl flex={1}>
                                            <FormLabel>
                                                Số lượng nhân viên
                                            </FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none">
                                                    <FiUsers />
                                                </InputLeftElement>
                                                <Input
                                                    name="employeeCount"
                                                    value={
                                                        company.employeeCount
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="VD: 10-50"
                                                    pl={10}
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl flex={1}>
                                            <FormLabel>Địa điểm</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none">
                                                    <FiMapPin />
                                                </InputLeftElement>
                                                <Input
                                                    name="location"
                                                    value={company.location}
                                                    onChange={handleChange}
                                                    placeholder="VD: Tây Mỗ, Hà Nội"
                                                    pl={10}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>

                                    <FormControl>
                                        <FormLabel>Website</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <FiGlobe />
                                            </InputLeftElement>
                                            <Input
                                                name="website"
                                                value={company.website}
                                                onChange={handleChange}
                                                placeholder="https://www.example.com"
                                                pl={10}
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Mô tả công ty</FormLabel>
                                        <MdEditor
                                            placeholder="Nhập mô tả chi tiết về công ty...."
                                            style={{ height: "500px" }}
                                            renderHTML={(text) =>
                                                mdParser.render(text)
                                            }
                                            onChange={(e) => {
                                                setText(e.text);
                                                setCompany((prev) => ({
                                                    ...prev,
                                                    description: e.text,
                                                }));
                                            }}
                                            value={text}
                                        />
                                    </FormControl>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Submit Button */}
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                colorScheme="blue"
                                size="lg"
                                leftIcon={<FiSave />}
                                isLoading={isCreating || isUpdating}
                                loadingText="Đang xử lý..."
                                px={10}
                            >
                                {data?.data?.id
                                    ? "Lưu thay đổi"
                                    : "Tạo công ty"}
                            </Button>
                        </Box>
                    </form>
                </VStack>
            </Box>
        </ManagerTemplate>
    );
};

export default MyCompany;
