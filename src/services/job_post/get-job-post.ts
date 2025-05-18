import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_JOB_POST_QUERY_KEY = "job_posts";

const get = async (id: number) => {
    const { data } = await api.get(`/job_posts/${id}`);
    return data;
};

export const getOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_JOB_POST_QUERY_KEY],
        queryFn: () => get(id),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    id: number;
};

export const useGetJobPost = ({ queryConfig, id }: GetType) => {
    return useQuery({
        ...getOptions(id),
        ...queryConfig,
    });
};
