import React from "react";
import {
    Box,
    Flex,
    VStack,
    Text,
    Icon,
    Divider,
    Avatar,
    useColorModeValue,
    BoxProps,
    FlexProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { routesMap } from "../../../routes/routes";
import { useTranslation } from "react-i18next";
import icons from "../../../constants/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
    isActive: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavbarProps extends BoxProps {}

const Navbar: React.FC<NavbarProps> = (props) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const user = useAppSelector((state) => state.user);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const LinkItems: Array<LinkItemProps> = [
        {
            name: t("navbar.myCompany"),
            icon: icons.users,
            href: routesMap.MyCompany,
            isActive: user?.role === "company",
        },
        {
            name: t("navbar.user"),
            icon: icons.users,
            href: routesMap.UserManage,
            isActive: user?.role === "admin" || user?.role === "company",
        },
        {
            name: t("navbar.companyManage"),
            icon: icons.chart,
            href: routesMap.CompanyManage,
            isActive: user?.role === "admin",
        },
        {
            name: t("navbar.postManage"),
            icon: icons.chart,
            href: routesMap.PostManage,
            isActive: true,
        },
        {
            name: t("navbar.cvApplyManage"),
            icon: icons.chart,
            href: routesMap.CvApplyManage,
            isActive: user?.role === "company" || user?.role === "recruiter",
        },
        {
            name: t("navbar.categoryManage"),
            icon: icons.chart,
            href: routesMap.CategoryManage,
            isActive: user?.role === "admin",
        },
        {
            name: t("navbar.chart"),
            icon: icons.chart,
            href: routesMap.Chart,
            isActive: true,
        },
    ];

    return (
        <Box
            w={{ base: "full", md: "20%" }}
            h="full"
            bg={bgColor}
            borderRight="1px"
            borderRightColor={borderColor}
            pos="fixed"
            boxShadow="sm"
            {...props}
        >
            <Flex direction="column" align="center" mb="6" mt="4">
                <Avatar
                    size="md"
                    name="User Name"
                    src="https://bit.ly/broken-link"
                    mb="2"
                />
                <Text fontWeight="medium">{user?.name}</Text>
                <Text fontSize="sm" color="gray.500">
                    {user?.email}
                </Text>
            </Flex>

            <Divider />

            <VStack align="stretch" spacing="1" mt="4">
                {LinkItems.map((link) => {
                    if (link.isActive) {
                        return (
                            <NavItem
                                key={link.name}
                                icon={link.icon}
                                action={() => navigate(link.href)}
                            >
                                {link.name}
                            </NavItem>
                        );
                    } else {
                        return null;
                    }
                })}
            </VStack>

            <Divider mt="6" />
        </Box>
    );
};

export default Navbar;

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: React.ReactNode;
    action: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    children,
    action,
    ...rest
}) => {
    return (
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: useColorModeValue("teal.50", "teal.900"),
                color: useColorModeValue("teal.700", "teal.200"),
            }}
            {...rest}
            onClick={action}
        >
            {icon && (
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color: useColorModeValue("teal.500", "teal.300"),
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};
