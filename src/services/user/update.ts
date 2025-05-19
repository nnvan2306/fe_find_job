import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
};

const update = async (payload: PayLoadType) => {
    const { data } = await api.put(`/users/${payload.id}`, payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateUser = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
