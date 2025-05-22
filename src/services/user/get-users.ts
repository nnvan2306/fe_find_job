import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_USERS_QUERY_KEY = "users";

type Payload = {
    company_id?: number;
    isUnActive?: boolean;
    page?: number;
    pageSize?: number;
};

const get = async (nest?: Payload) => {
    const params = new URLSearchParams();

    if (nest?.company_id)
        params.append("company_id", nest.company_id.toString());
    if (nest?.isUnActive !== undefined)
        params.append("isUnActive", String(nest.isUnActive));
    if (nest?.page) params.append("page", nest.page.toString());
    if (nest?.pageSize) params.append("pageSize", nest.pageSize.toString());

    const query = `/users${params.toString() ? `?${params.toString()}` : ""}`;
    const { data } = await api.get(query);
    return data;
};

export const getOptions = (nest: Payload) =>
    queryOptions({
        queryKey: [GET_USERS_QUERY_KEY, nest],
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
