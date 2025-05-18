import { Box, HStack } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";

const CvApplyManage = () => {
    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title="Quản lý Cv ứng tuyển" />
                <HStack></HStack>
                <TableCommon columns={[{ key: "", label: "" }]} data={[]} />
            </Box>
        </ManagerTemplate>
    );
};

export default CvApplyManage;
