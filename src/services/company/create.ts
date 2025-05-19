import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

type PayLoadType = {
    owner_id: number;
    name: string;
    description: string;
    employeeCount: string;
    website: string;
    logo_url: string;
    location: string;
    verified: boolean;
};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/companies", payload);
    return data;
};

type CreateType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateCompany = ({ mutationConfig }: CreateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
