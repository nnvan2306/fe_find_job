import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CVS_QUERY_KEY = "cvs";

type Payload = {
    search?: string;
    user_id?: number;
    is_shared?: boolean;
    isUnActive?: boolean;
};

const buildQuery = (params: Payload): string => {
    const query = new URLSearchParams();

    if (params.search) query.append("search", params.search);
    if (params.user_id) query.append("user_id", params.user_id.toString());
    if (params.is_shared) query.append("is_shared", "true");

    const queryString = query.toString();
    return queryString ? `/cvs?${queryString}` : "/cvs";
};

const get = async (params: Payload) => {
    const query = buildQuery(params);
    const { data } = await api.get(query);
    return data;
};

export const getOptions = (params: Payload) =>
    queryOptions({
        queryKey: [GET_CVS_QUERY_KEY, params],
        queryFn: () => get(params),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    nest: Payload;
};

export const useGetCvs = ({ queryConfig, nest }: GetType) => {
    return useQuery({
        ...getOptions(nest),
        ...queryConfig,
        enabled: Boolean(!nest.isUnActive),
    });
};
