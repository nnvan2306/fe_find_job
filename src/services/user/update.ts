import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
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

const update = async (payload: PayLoadType) => {
    const { data } = await api.put("/job_posts", payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateJobPost = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
