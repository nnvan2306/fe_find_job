import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
};

const update = async (payload: PayLoadType) => {
    const { data } = await api.put(`/cvs/set-share/${payload.id}`);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useSetShareCv = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
