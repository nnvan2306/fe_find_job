import {
  Avatar,
  Box,
  Button,
  Container,
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
import { routesMap } from "../../../routes/routes";
import { logout } from "../../../store/features/user/userSlice";

const Header = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const greenColor = "#2A804F";
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const isActive = useCallback((path: string) => path === pathName, [pathName]);

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
        px={3}
        py={2}
        fontWeight="medium"
        color="gray.600"
        _hover={{
          color: greenColor,
          transform: "translateY(-1px)",
          transition: "all 0.2s",
        }}
        cursor="pointer"
        textTransform="uppercase"
        fontSize={{ base: "sm", md: "md" }}
        borderBottom={isActive(item.path) ? "2px solid" : ""}
        borderColor={greenColor}
        onClick={() => {
          navigate(item.path);
          onClose();
        }}
      >
        {item.label}
      </Text>
    ));

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={1000}
        bg={bgColor}
        boxShadow="sm"
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Container maxW="container.xl">
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            py={4}
          >
            <Flex align="center">
              <IconButton
                display={{ base: "inline-flex", md: "none" }}
                onClick={onOpen}
                icon={<FiMenu />}
                variant="ghost"
                aria-label="Open Menu"
                mr={2}
                _hover={{ bg: buttonHoverBg }}
              />
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.500"
                fontWeight="bold"
                ml={3}
                cursor="pointer"
                onClick={() => navigate(routesMap.Home)}
                _hover={{ color: greenColor }}
                transition="color 0.2s"
              >
                Find Job
              </Text>
            </Flex>

            <HStack
              spacing={{ base: 2, md: 6 }}
              display={{ base: "none", md: "flex" }}
              flex={1}
              justify="center"
            >
              {renderNavItems()}
            </HStack>

            <HStack spacing={{ base: 2, md: 3 }}>
              {!user ? (
                <>
                  <Button
                    bg={greenColor}
                    w={{ base: "100px", md: "120px" }}
                    color="white"
                    borderRadius="md"
                    _hover={{
                      bg: "#236B40",
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                    fontWeight="bold"
                    onClick={() => navigate(routesMap.Login)}
                    transition="all 0.2s"
                  >
                    {t("headers.buttons.login")}
                  </Button>
                  <Button
                    variant="outline"
                    w={{ base: "100px", md: "120px" }}
                    borderColor={greenColor}
                    color={greenColor}
                    borderRadius="md"
                    _hover={{
                      bg: "green.50",
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                    fontWeight="bold"
                    onClick={() => navigate(routesMap.Regsiter)}
                    transition="all 0.2s"
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
                      _hover={{
                        bg: buttonHoverBg,
                        transform: "translateY(-1px)",
                      }}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                      transition="all 0.2s"
                    >
                      <HStack spacing={3}>
                        <Avatar size="sm" name={user.name} src="" />
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
                            <Avatar size="md" name={user.name} src="" />
                            <Box>
                              <Text fontWeight="medium" fontSize="sm">
                                {user.name}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {user.email}
                              </Text>
                            </Box>
                          </HStack>
                        </Box>
                        <Divider />
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          leftIcon={<Icon as={FiUser} boxSize={4} />}
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
                            leftIcon={<Icon as={FiUser} boxSize={4} />}
                            py={3}
                            borderRadius={0}
                            _hover={{ bg: itemHoverBg }}
                            onClick={() => navigate(routesMap.UserManage)}
                          >
                            {t("headers.popover.manage")}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          leftIcon={
                            <Icon as={FiLogOut} boxSize={4} color="red.500" />
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
                  w={{ base: "14", md: "16" }}
                  bg={i18n.language === "en" ? greenColor : ""}
                  borderColor={greenColor}
                  color={i18n.language === "en" ? "white" : greenColor}
                  borderRadius="md"
                  _hover={{
                    bg: i18n.language === "en" ? "#236B40" : "green.50",
                    transform: "translateY(-1px)",
                  }}
                  fontWeight="bold"
                  roundedRight={0}
                  onClick={() => i18n.changeLanguage("en")}
                  transition="all 0.2s"
                >
                  Eng
                </Button>
                <Button
                  variant="outline"
                  w={{ base: "14", md: "16" }}
                  bg={i18n.language === "vi" ? greenColor : ""}
                  borderColor={greenColor}
                  color={i18n.language === "vi" ? "white" : greenColor}
                  borderRadius="md"
                  _hover={{
                    bg: i18n.language === "vi" ? "#236B40" : "green.50",
                    transform: "translateY(-1px)",
                  }}
                  fontWeight="bold"
                  roundedLeft={0}
                  onClick={() => i18n.changeLanguage("vi")}
                  transition="all 0.2s"
                >
                  Vi
                </Button>
              </HStack>
            </HStack>
          </Flex>
        </Container>
      </Box>

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
