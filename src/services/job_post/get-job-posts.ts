import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_JOB_POSTS_QUERY_KEY = "job_posts";

type Payload = {
    search?: string;
    category_id?: number;
    company_id?: number;
};

const buildQuery = (params?: Payload): string => {
    const query = new URLSearchParams();

    if (params?.search) query.append("search", params.search);
    if (params?.category_id)
        query.append("category_id", params.category_id.toString());
    if (params?.company_id)
        query.append("company_id", params.company_id.toString());

    const queryString = query.toString();
    return queryString ? `/job-posts?${queryString}` : "/job-posts";
};

const get = async (params?: Payload) => {
    const url = buildQuery(params);
    const { data } = await api.get(url);
    return data;
};

export const getOptions = (params?: Payload) =>
    queryOptions({
        queryKey: [GET_JOB_POSTS_QUERY_KEY, params],
        queryFn: () => get(params),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    nest?: Payload;
};

export const useGetJobPosts = ({ queryConfig, nest }: GetType) => {
    return useQuery({
        ...getOptions(nest),
        ...queryConfig,
    });
};
