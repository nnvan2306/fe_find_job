import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    company_id: number;
    recruiter_id: number;
    title: string;
    description: string;
    location: string;
    salary_range: string;
    category_id: number;
    required_skills: string;
    status: string;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/job-posts", payload);
    return data;
};

type CreateType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateJobPost = ({ mutationConfig }: CreateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
