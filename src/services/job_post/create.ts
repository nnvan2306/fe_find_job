import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    company_id: number;
    recruiter_id: string;
    title: string;
    description: string;
    location: string;
    salary_range: string;
    job_type: string;
    required_skills: string;
    status: string;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/job_posts", payload);
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
