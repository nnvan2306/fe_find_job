import { Box, HStack, Select, useDisclosure } from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import { useGetCompanis } from "../../../services/company/get-companies";
import { useCallback, useMemo, useState } from "react";
import ActionManage from "../../molecules/ActionMAnage";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import { useDeleteCategory } from "../../../services/category/delete";
import { getAxiosError } from "../../../libs/axios";
import toast from "../../../libs/toast";
import { useUpdateStatusCompany } from "../../../services/company/updateStatus";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../molecules/Pagination";

const CompanyManage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [idDelete, setIdDelete] = useState(0);
    const [searchParams] = useSearchParams();
    const page = useMemo(
        () => Number(searchParams.get("page")) || 1,
        [searchParams]
    );
    const pageSize = useMemo(
        () => Number(searchParams.get("pageSize")) || 10,
        [searchParams]
    );

    const { mutate: updateStatus } = useUpdateStatusCompany({
        mutationConfig: {
            onSuccess() {
                refetch();
                toast({
                    title: "Cập nhật thành công",
                    status: "success",
                });
            },
            onError(error) {
                toast({
                    title: getAxiosError(error),
                    status: "error",
                });
            },
        },
    });

    const handleUpdateStatus = useCallback(
        (id: number, verified: boolean) => {
            updateStatus({ id, verified });
        },
        [updateStatus]
    );

    const { data, refetch } = useGetCompanis({
        nest: { page: page, pageSize: pageSize },
    });
    const companies = useMemo(() => {
        return (data?.data || []).map((item) => {
            return {
                ...item,
                update: (
                    <HStack justifyContent="center">
                        <Select
                            value={item.verified ? "active" : "inactive"}
                            onChange={(e) => {
                                handleUpdateStatus(
                                    item.id,
                                    e.target.value === "active"
                                );
                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Select>
                    </HStack>
                ),
                action: (
                    <ActionManage
                        actionDelete={() => {
                            setIdDelete(item.id);
                            onOpen();
                        }}
                        // actionUpdate={() => {}}
                    />
                ),
            };
        });
    }, [data]);

    const { mutate, isPending } = useDeleteCategory({
        mutationConfig: {
            onSuccess() {
                onClose();
                refetch();
                toast({
                    title: "Xóa thành công",
                    status: "success",
                });
            },
            onError(error) {
                toast({
                    title: getAxiosError(error),
                    status: "error",
                });
            },
        },
    });
    const handleDelete = useCallback(() => {
        mutate(idDelete);
    }, [idDelete, mutate]);

    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title="Quản Lý công ty" />
                <TableCommon
                    columns={[
                        { key: "name", label: "Tên", w: "20%" },
                        { key: "logo_url", label: "Logo", w: "15%" },
                        {
                            key: "location",
                            label: "Địa chỉ",
                            w: "15%",
                        },
                        {
                            key: "website",
                            label: "website",
                            w: "20%",
                        },
                        { key: "update", label: "Update", w: "20%" },
                        { key: "action", label: "", w: "15%" },
                    ]}
                    data={companies}
                />
                <Pagination
                    currentPage={data?.pagination?.currentPage || 1}
                    totalPage={data?.pagination?.totalPages || 10}
                />
                <ConfirmDelete
                    header="Confirm xóa Company"
                    title="Bạn chắc chắn muốn xóa?, hành động này không thể khôi phục."
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onDelete={handleDelete}
                    isLoading={isPending}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default CompanyManage;
