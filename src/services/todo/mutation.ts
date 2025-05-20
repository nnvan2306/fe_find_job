import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import { MutationConfig } from "../../libs/query";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PayLoadType = {};

const create = async (payload: PayLoadType) => {
    const { data } = await api.post("/", payload);
    return data;
};

type CreateType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateToDo = ({ mutationConfig }: CreateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
