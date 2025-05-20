import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const GET_TODO_QUERY_KEY = "todo";

const get = async () => {
    const { data } = await api.get(`/`);
    return data;
};

export const getOptions = () =>
    queryOptions({
        queryKey: [GET_TODO_QUERY_KEY],
        queryFn: () => get(),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    id: string;
};

export const useGetTodo = ({ queryConfig }: GetType) => {
    return useQuery({
        ...getOptions(),
        ...queryConfig,
    });
};
