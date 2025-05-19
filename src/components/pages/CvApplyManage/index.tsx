import { Box, Button, HStack, Icon } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import { useAppSelector } from "../../../app/hooks";
import { useMemo } from "react";
import { useGetApplies } from "../../../services/application/get-applies";
import ActionManage from "../../molecules/ActionMAnage";
import icons from "../../../constants/icons";

const CvApplyManage = () => {
    const user = useAppSelector((state) => state.user);
    const query = useMemo(() => {
        if (user?.role === "company") {
            return {
                company_id: user?.company_id,
            };
        }
        if (user?.role === "recruiter") {
            return {
                recruiter_id: user?.id,
            };
        }
    }, [user]);
    const { data: applyData } = useGetApplies({
        nest: query,
    });
    const applies = useMemo(
        () =>
            (applyData?.data || []).map((item) => ({
                ...item,
                title: item?.jobPost?.title || "",
                cv: (
                    <Button
                        onClick={() =>
                            window.open(item.cv.file_url || "", "_blank")
                        }
                    >
                        <Icon as={icons.eye} />
                    </Button>
                ),
                action: <ActionManage actionDelete={() => {}} />,
            })),
        [applyData]
    );

    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title="Quản lý Cv ứng tuyển" />
                <TableCommon
                    columns={[
                        { key: "title", label: "Title" },
                        { key: "cv", label: "CV" },
                        { key: "action", label: "" },
                    ]}
                    data={applies}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default CvApplyManage;
