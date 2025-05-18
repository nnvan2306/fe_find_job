import { Box } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";

const CompanyManage = () => {
    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title="Quản Lý công ty" />
                <TableCommon
                    columns={[
                        { key: "name", label: "Name", w: "20%" },
                        { key: "logo_url", label: "Logo", w: "15%" },
                        {
                            key: "location",
                            label: "Location",
                            w: "20%",
                        },
                        {
                            key: "website",
                            label: "website",
                            w: "20%",
                        },
                        { key: "action", label: "", w: "25%" },
                    ]}
                    data={[]}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default CompanyManage;
