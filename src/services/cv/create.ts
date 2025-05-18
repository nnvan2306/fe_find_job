import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    user_id: number;
    title: string;
    required_skills: string;
    file_url: string;
    is_active: boolean;
    is_shared: string;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/cv", payload);
    return data;
};

type CreateType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateCv = ({ mutationConfig }: CreateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
