import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    Icon,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../../store/features/user/userSlice";
import { routesMap } from "../../../routes/routes";

const Header = () => {
    const bgColor = useColorModeValue("white", "gray.800");
    const greenColor = "#2A804F";
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const pathName = useLocation().pathname;
    const isActive = useCallback(
        (path: string) => path === pathName,
        [pathName]
    );

    const buttonBg = useColorModeValue("white", "gray.800");
    const buttonHoverBg = useColorModeValue("gray.100", "gray.700");
    const popoverBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const itemHoverBg = useColorModeValue("gray.100", "gray.700");
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const navItems = [
        { label: t("headers.job"), path: routesMap.Home },
        { label: t("headers.cvManage"), path: routesMap.CvManage },
        { label: t("headers.findCv"), path: routesMap.FindCv },
        { label: t("headers.companies"), path: routesMap.Companies },
    ];

    const renderNavItems = () =>
        navItems.map((item) => (
            <Text
                key={item.path}
                px={2}
                py={1}
                fontWeight="medium"
                color="gray.600"
                _hover={{ color: greenColor }}
                cursor="pointer"
                textTransform="uppercase"
                borderBottom={isActive(item.path) ? "2px solid" : ""}
                borderColor={greenColor}
                onClick={() => {
                    navigate(item.path);
                    onClose(); // đóng drawer khi ở mobile
                }}
            >
                {item.label}
            </Text>
        ));

    return (
        <>
            <Flex
                as="header"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%"
                px={6}
                py={3}
                bg={bgColor}
                boxShadow="sm"
            >
                {/* Logo + Icon mobile */}
                <Flex align="center">
                    <IconButton
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={onOpen}
                        icon={<FiMenu />}
                        variant="ghost"
                        aria-label="Open Menu"
                        mr={2}
                    />
                    <Text
                        fontSize="xl"
                        color="gray.500"
                        fontWeight="medium"
                        ml={3}
                        cursor="pointer"
                        onClick={() => navigate(routesMap.Home)}
                    >
                        Find Job
                    </Text>
                </Flex>

                {/* Menu trung tâm */}
                <HStack
                    spacing={6}
                    display={{ base: "none", md: "flex" }}
                    flex={1}
                    justify="center"
                >
                    {renderNavItems()}
                </HStack>

                {/* Login / Avatar + Ngôn ngữ */}
                <HStack spacing={3}>
                    {!user ? (
                        <>
                            <Button
                                bg={greenColor}
                                w={120}
                                color="white"
                                borderRadius="md"
                                _hover={{ bg: "#236B40" }}
                                fontWeight="bold"
                                onClick={() => navigate(routesMap.Login)}
                            >
                                {t("headers.buttons.login")}
                            </Button>
                            <Button
                                variant="outline"
                                w={120}
                                borderColor={greenColor}
                                color={greenColor}
                                borderRadius="md"
                                _hover={{ bg: "green.50" }}
                                fontWeight="bold"
                                onClick={() => navigate(routesMap.Regsiter)}
                            >
                                {t("headers.buttons.register")}
                            </Button>
                        </>
                    ) : (
                        <Popover placement="bottom-end">
                            <PopoverTrigger>
                                <Button
                                    rightIcon={<FiChevronDown />}
                                    variant="ghost"
                                    py={2}
                                    px={4}
                                    bg={buttonBg}
                                    _hover={{ bg: buttonHoverBg }}
                                    borderRadius="md"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                >
                                    <HStack spacing={3}>
                                        <Avatar size="sm" />
                                        <Box
                                            display={{
                                                base: "none",
                                                md: "block",
                                            }}
                                        >
                                            <Text
                                                fontWeight="medium"
                                                fontSize="sm"
                                                textAlign="left"
                                            >
                                                {user.name}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                width="240px"
                                bg={popoverBg}
                                borderColor={borderColor}
                                borderRadius="md"
                                boxShadow="lg"
                            >
                                <PopoverBody p={0}>
                                    <VStack align="stretch" spacing={0}>
                                        <Box px={4} py={3}>
                                            <HStack spacing={3}>
                                                <Avatar
                                                    size="md"
                                                    name={user.name}
                                                    src=""
                                                />
                                                <Box>
                                                    <Text
                                                        fontWeight="medium"
                                                        fontSize="10px"
                                                    >
                                                        {user.email}
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        </Box>
                                        <Divider />
                                        <Button
                                            variant="ghost"
                                            justifyContent="flex-start"
                                            leftIcon={
                                                <Icon as={FiUser} boxSize={4} />
                                            }
                                            py={3}
                                            borderRadius={0}
                                            _hover={{ bg: itemHoverBg }}
                                        >
                                            {t("headers.popover.profile")}
                                        </Button>
                                        {user.role === "admin" && (
                                            <Button
                                                variant="ghost"
                                                justifyContent="flex-start"
                                                leftIcon={
                                                    <Icon
                                                        as={FiUser}
                                                        boxSize={4}
                                                    />
                                                }
                                                py={3}
                                                borderRadius={0}
                                                _hover={{ bg: itemHoverBg }}
                                            >
                                                {t("headers.popover.manage")}
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            justifyContent="flex-start"
                                            leftIcon={
                                                <Icon
                                                    as={FiLogOut}
                                                    boxSize={4}
                                                    color="red.500"
                                                />
                                            }
                                            color="red.500"
                                            py={3}
                                            borderRadius={0}
                                            _hover={{ bg: itemHoverBg }}
                                            onClick={() => dispatch(logout())}
                                        >
                                            {t("headers.popover.logout")}
                                        </Button>
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    )}
                    {/* Language */}
                    <HStack gap={0}>
                        <Button
                            variant="outline"
                            w={16}
                            bg={i18n.language === "en" ? greenColor : ""}
                            borderColor={greenColor}
                            color={
                                i18n.language === "en" ? "white" : greenColor
                            }
                            borderRadius="md"
                            _hover={{ bg: "green.50" }}
                            fontWeight="bold"
                            roundedRight={0}
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            Eng
                        </Button>
                        <Button
                            variant="outline"
                            w={16}
                            bg={i18n.language === "vi" ? greenColor : ""}
                            borderColor={greenColor}
                            color={
                                i18n.language === "vi" ? "white" : greenColor
                            }
                            borderRadius="md"
                            _hover={{ bg: "green.50" }}
                            fontWeight="bold"
                            roundedLeft={0}
                            onClick={() => i18n.changeLanguage("vi")}
                        >
                            Vi
                        </Button>
                    </HStack>
                </HStack>
            </Flex>

            {/* Drawer cho mobile */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody p={4}>
                        <VStack align="start" spacing={4}>
                            {renderNavItems()}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Header;
