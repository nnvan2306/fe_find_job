import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CVS_QUERY_KEY = "cvs";

const get = async () => {
    const { data } = await api.get(`/cv`);
    return data;
};

export const getOptions = () =>
    queryOptions({
        queryKey: [GET_CVS_QUERY_KEY],
        queryFn: () => get(),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
};

export const useGetCvs = ({ queryConfig }: GetType) => {
    return useQuery({
        ...getOptions(),
        ...queryConfig,
    });
};
