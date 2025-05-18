import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_JOB_POSTS_QUERY_KEY = "job_posts";

const get = async () => {
    const { data } = await api.get(`/job_posts`);
    return data;
};

export const getOptions = () =>
    queryOptions({
        queryKey: [GET_JOB_POSTS_QUERY_KEY],
        queryFn: () => get(),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
};

export const useGetJobPosts = ({ queryConfig }: GetType) => {
    return useQuery({
        ...getOptions(),
        ...queryConfig,
    });
};
