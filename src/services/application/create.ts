import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    user_id: number;
    job_post_id: number;
    cv_id: number;
    recruiter_id: number;
    company_id: number;
    status: string;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/applications", payload);
    return data;
};

type CreateType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateApplication = ({ mutationConfig }: CreateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
