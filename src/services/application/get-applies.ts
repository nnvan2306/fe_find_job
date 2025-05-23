import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_APPLIES_QUERY_KEY = "applies";

type Payload = {
    user_id?: number;
    company_id?: number;
    recruiter_id?: number;
    isUnActive?: boolean;
    page?: number;
    pageSize?: number;
};

const buildQuery = (params?: Payload): string => {
    const query = new URLSearchParams();

    if (params?.user_id) query.append("user_id", params.user_id.toString());
    if (params?.company_id)
        query.append("company_id", params.company_id.toString());
    if (params?.recruiter_id)
        query.append("recruiter_id", params.recruiter_id.toString());
    if (params?.page) query.append("page", params.page.toString());
    if (params?.pageSize) query.append("pageSize", params.pageSize.toString());

    const queryString = query.toString();
    return queryString ? `/applications?${queryString}` : "/applications";
};

const get = async (params?: Payload) => {
    const url = buildQuery(params);
    const { data } = await api.get(url);
    return data;
};

export const getOptions = (params?: Payload) =>
    queryOptions({
        queryKey: [GET_APPLIES_QUERY_KEY, params],
        queryFn: () => get(params),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    nest?: Payload;
};

export const useGetApplies = ({ queryConfig, nest }: GetType) => {
    return useQuery({
        ...getOptions(nest),
        ...queryConfig,
        enabled: Boolean(!nest?.isUnActive),
    });
};
