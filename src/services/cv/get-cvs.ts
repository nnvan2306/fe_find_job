import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CVS_QUERY_KEY = "cvs";

type Payload = { search: string };
const get = async ({ search }: Payload) => {
    let query = "/cv";
    if (search) {
        query = `/cv?search=${search}`;
    }
    const { data } = await api.get(query);
    return data;
};

export const getOptions = (nest: Payload) =>
    queryOptions({
        queryKey: [GET_CVS_QUERY_KEY],
        queryFn: () => get(nest),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    nest: Payload;
};

export const useGetCvs = ({ queryConfig, nest }: GetType) => {
    return useQuery({
        ...getOptions(nest),
        ...queryConfig,
    });
};
