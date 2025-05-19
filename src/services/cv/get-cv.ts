import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CV_QUERY_KEY = "cv";

const get = async (id: number) => {
    const { data } = await api.get(`/cvs/${id}`);
    return data;
};

export const getOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_CV_QUERY_KEY, id],
        queryFn: () => get(id),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    id: number;
};

export const useGetCv = ({ queryConfig, id }: GetType) => {
    return useQuery({
        ...getOptions(id),
        ...queryConfig,
    });
};
