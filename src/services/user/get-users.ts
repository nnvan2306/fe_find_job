import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_USERS_QUERY_KEY = "users";

type Payload = {
    company_id?: number;
    isUnActive?: boolean;
};

const get = async ({ company_id }: Payload) => {
    let query = "/users";
    if (company_id) {
        query = `/users?company_id=${company_id}`;
    }
    const { data } = await api.get(query);
    return data;
};

export const getOptions = (nest: Payload) =>
    queryOptions({
        queryKey: [GET_USERS_QUERY_KEY],
        queryFn: () => get(nest),
    });

type GetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
    nest: Payload;
};

export const useGetUsers = ({ queryConfig, nest }: GetType) => {
    return useQuery({
        ...getOptions(nest),
        ...queryConfig,
        enabled: Boolean(!nest.isUnActive),
    });
};
