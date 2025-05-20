import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
    idCv: number;
};

const update = async (payload: PayLoadType) => {
    const { data } = await api.put(`/cvs/set-main/${payload.id}`, payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useSetMainCv = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
