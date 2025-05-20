import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

const deleteCategory = async (id: number) => {
    const { data } = await api.delete(`/job-posts/${id}`);
    return data;
};

type DeleteType = {
    mutationConfig?: MutationConfig<typeof deleteCategory>;
};

export const useDeleteJobPost = ({ mutationConfig }: DeleteType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteCategory,
    });
};
