import React from "react";
import { Box, Flex } from "@chakra-ui/react";

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box pb={10}>
            <Flex>{children}</Flex>
        </Box>
    );
};

export default MainTemPlate;
