import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_COMPANIES_QUERY_KEY = "companies";

type Payload = {
    search?: string;
    status?: string;
    page?: number;
    pageSize?: number;
};
const get = async (nest?: Payload) => {
    const params = new URLSearchParams();

    if (nest?.search) params.append("search", nest.search);
    if (nest?.status) params.append("verified", nest.status);
    if (nest?.page) params.append("page", nest.page.toString());
    if (nest?.pageSize) params.append("pageSize", nest.pageSize.toString());

    const query = `/companies${
        params.toString() ? `?${params.toString()}` : ""
    }`;
    const { data } = await api.get(query);
    return data;
};

export const getOptions = (nest?: Payload) =>
    queryOptions({
        queryKey: [GET_COMPANIES_QUERY_KEY, nest],
        queryFn: () => get(nest),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    nest?: Payload;
};

export const useGetCompanis = ({ queryConfig, nest }: GetType) => {
    return useQuery({
        ...getOptions(nest),
        ...queryConfig,
    });
};
