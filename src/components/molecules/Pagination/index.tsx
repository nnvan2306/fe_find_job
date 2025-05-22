import { BoxProps, Button, HStack, Icon, Text } from "@chakra-ui/react";
import icons from "../../../constants/icons";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

type Props = {
    currentPage: number;
    totalPage: number;
} & BoxProps;
const Pagination = ({ currentPage, totalPage, ...props }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = useMemo(
        () => Number(searchParams.get("page")) || 1,
        [searchParams]
    );
    const pageSize = useMemo(
        () => Number(searchParams.get("pageSize")) || 10,
        [searchParams]
    );

    const handlePrevious = () => {
        if (!page || page === 1) {
            return;
        }
        setSearchParams({ page: String(page - 1), pageSize: String(pageSize) });
    };

    const handleNext = () => {
        if (page === totalPage) {
            return;
        }
        setSearchParams({ page: String(page + 1), pageSize: String(pageSize) });
    };
    return (
        <HStack justifyContent="space-between" {...props} mt="20px">
            <HStack>
                <Button
                    leftIcon={<Icon as={icons.previous} />}
                    variant="variants"
                    onClick={handlePrevious}
                >
                    Trước
                </Button>
                <Text>
                    Trang {currentPage} của {totalPage}
                </Text>
            </HStack>
            <Button
                rightIcon={<Icon as={icons.next} />}
                variant="variants"
                onClick={handleNext}
            >
                Sau
            </Button>
        </HStack>
    );
};

export default Pagination;
