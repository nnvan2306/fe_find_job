import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    id: number;
    owner_id: number;
    name: string;
    description: string;
    employeeCount: string;
    website: string;
    logo_url: string;
    location: string;
    verified: boolean;
};

const update = async (payload: PayLoadType) => {
    const { data } = await api.put(`/companies/${payload.id}`, payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateCompany = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
