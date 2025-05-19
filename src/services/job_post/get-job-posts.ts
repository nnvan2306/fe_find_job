import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_JOB_POSTS_QUERY_KEY = "job_posts";

type Payload = {
    search?: string;
    category_id?: number;
};
const get = async (nest?: Payload) => {
    let url = "/job-posts";
    if (nest?.search) {
        url += `?search=${nest.search}`;
    }
    if (nest?.category_id) {
        url += `?category_id=${nest.category_id}`;
    }
    const { data } = await api.get(url);
    return data;
};

export const getOptions = (nest?: Payload) =>
    queryOptions({
        queryKey: [GET_JOB_POSTS_QUERY_KEY, nest],
        queryFn: () => get(nest),
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
