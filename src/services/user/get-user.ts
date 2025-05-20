import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_USER_QUERY_KEY = "user";

const get = async (id: number) => {
    const { data } = await api.get(`/user/${id}`);
    return data;
};

export const getOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_USER_QUERY_KEY],
        queryFn: () => get(id),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    id: number;
};

export const useGetUser = ({ queryConfig, id }: GetType) => {
    return useQuery({
        ...getOptions(id),
        ...queryConfig,
    });
};
