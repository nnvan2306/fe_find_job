import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    VStack,
    HStack,
    Text,
    Heading,
    useToast,
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

const mdParser = new MarkdownIt(/* Markdown-it options */);

interface Company {
    name: string;
    description: string;
    employeeCount: string;
    website: string;
    logo_url: string;
    location: string;
}

const MyCompany = () => {
    const [text, setText] = useState("");
    const [company, setCompany] = useState<Company>({
        name: "",
        description: "",
        employeeCount: "",
        website: "",
        logo_url: "",
        location: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const toast = useToast();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCompany((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setCompany((prev) => ({
                    ...prev,
                    logo_url: file.name,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!company.name) {
            toast({
                title: "Thông tin thiếu",
                description: "Vui lòng nhập tên công ty",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
    };

    return (
        <ManagerTemplate>
            <Box p={4} mx="auto" w="100%">
                <VStack spacing={8} align="stretch">
                    {/* <Heading size="lg" textAlign="center">
                        Tạo Công Ty Mới
                    </Heading> */}

                    <form onSubmit={handleSubmit}>
                        <Card variant="outline" mb={6}>
                            <CardBody>
                                <VStack spacing={6} align="stretch">
                                    <Box textAlign="center">
                                        {previewImage ? (
                                            <Image
                                                src={previewImage}
                                                alt="Company Logo Preview"
                                                boxSize="150px"
                                                objectFit="contain"
                                                mx="auto"
                                                borderRadius="md"
                                            />
                                        ) : (
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
                                                <Text color="gray.400">
                                                    Logo công ty
                                                </Text>
                                            </Box>
                                        )}
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
                                        <Input
                                            name="name"
                                            value={company.name}
                                            onChange={handleChange}
                                            placeholder="Nhập tên công ty"
                                            leftElement={
                                                <Box pl={2}>
                                                    <FiInfo />
                                                </Box>
                                            }
                                        />
                                    </FormControl>

                                    <HStack spacing={4} align="start">
                                        <FormControl flex={1}>
                                            <FormLabel>
                                                Số lượng nhân viên
                                            </FormLabel>
                                            <Input
                                                name="employeeCount"
                                                value={company.employeeCount}
                                                onChange={handleChange}
                                                placeholder="VD: 10-50"
                                                leftElement={
                                                    <Box pl={2}>
                                                        <FiUsers />
                                                    </Box>
                                                }
                                            />
                                        </FormControl>

                                        <FormControl flex={1}>
                                            <FormLabel>Địa điểm</FormLabel>
                                            <Input
                                                name="location"
                                                value={company.location}
                                                onChange={handleChange}
                                                placeholder="VD: Tây Mỗ, Hà Nội"
                                                leftElement={
                                                    <Box pl={2}>
                                                        <FiMapPin />
                                                    </Box>
                                                }
                                            />
                                        </FormControl>
                                    </HStack>

                                    <FormControl>
                                        <FormLabel>Website</FormLabel>
                                        <Input
                                            name="website"
                                            value={company.website}
                                            onChange={handleChange}
                                            placeholder="https://www.example.com"
                                            leftElement={
                                                <Box pl={2}>
                                                    <FiGlobe />
                                                </Box>
                                            }
                                        />
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
                                                    description: e.html,
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
                                isLoading={isLoading}
                                loadingText="Đang xử lý..."
                                px={10}
                            >
                                Tạo công ty
                            </Button>
                        </Box>
                    </form>
                </VStack>
            </Box>
        </ManagerTemplate>
    );
};

export default MyCompany;
