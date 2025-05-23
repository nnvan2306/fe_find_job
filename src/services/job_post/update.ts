import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
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

const update = async (payload: PayLoadType) => {
    const { data } = await api.put(`/job-posts/${payload.id}`, payload);
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
