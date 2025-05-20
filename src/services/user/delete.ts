import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

const deleteCategory = async (id: number) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
};

type DeleteType = {
    mutationConfig?: MutationConfig<typeof deleteCategory>;
};

export const useDeleteUser = ({ mutationConfig }: DeleteType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteCategory,
    });
};
