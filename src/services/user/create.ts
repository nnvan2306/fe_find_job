import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
};

const update = async (payload: PayLoadType) => {
    console.log(payload);
    const { data } = await api.post(`/users`, payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useCreateUser = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
