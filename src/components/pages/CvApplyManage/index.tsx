import { Box, Button, Icon, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import icons from "../../../constants/icons";
import { getAxiosError } from "../../../libs/axios";
import toast from "../../../libs/toast";
import { useDeleteApplycation } from "../../../services/application/delete";
import { useGetApplies } from "../../../services/application/get-applies";
import TitleManage from "../../atoms/TitleManage";
import ActionManage from "../../molecules/ActionMAnage";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import TableCommon from "../../organisms/TableCommon";
import ManagerTemplate from "../../templates/ManagerTemplate";

const CvApplyManage = () => {
    const user = useAppSelector((state) => state.user);
    const [idDelete, setIdDelete] = useState(0);
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

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
    const { data: applyData, refetch } = useGetApplies({
        nest: query,
    });
    const applies = useMemo(
        () =>
            (applyData?.data || []).map((item) => ({
                ...item,
                title: item?.jobPost?.title || "",
                nature: `${item?.nature || 0}%`,
                cv: (
                    <Button
                        onClick={() =>
                            window.open(item.cv.file_url || "", "_blank")
                        }
                    >
                        <Icon as={icons.eye} />
                    </Button>
                ),
                action: (
                    <ActionManage
                        actionDelete={() => {
                            setIdDelete(item.id);
                            onOpenDelete();
                        }}
                    />
                ),
            })),
        [applyData]
    );

    const { mutate, isPending } = useDeleteApplycation({
        mutationConfig: {
            onSuccess() {
                toast({
                    title: "Xóa thành công",
                });
                onCloseDelete();
                refetch();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const handleDelete = () => {
        if (idDelete) {
            mutate(idDelete);
        }
    };

    // console.log(compareSkills("a", "s"));

    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title="Quản lý Cv ứng tuyển" />
                <TableCommon
                    columns={[
                        { key: "title", label: "Tiêu đề" },
                        { key: "nature", label: "Tương thích" },
                        { key: "cv", label: "CV" },
                        { key: "action", label: "" },
                    ]}
                    data={applies}
                />

                <ConfirmDelete
                    header="Confirm xóa Apply"
                    title="Bạn chắc chắn muốn xóa?, hành động này không thể khôi phục."
                    isOpen={isOpenDelete}
                    onOpen={onOpenDelete}
                    onClose={onCloseDelete}
                    onDelete={handleDelete}
                    isLoading={isPending}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default CvApplyManage;
