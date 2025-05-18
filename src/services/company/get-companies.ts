import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_COMPANIES_QUERY_KEY = "companies";

const get = async () => {
    const { data } = await api.get(`/company`);
    return data;
};

export const getOptions = () =>
    queryOptions({
        queryKey: [GET_COMPANIES_QUERY_KEY],
        queryFn: () => get(),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
};

export const useGetCompanis = ({ queryConfig }: GetType) => {
    return useQuery({
        ...getOptions(),
        ...queryConfig,
    });
};
