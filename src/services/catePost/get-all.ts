import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import { QueryConfig } from "../../libs/query";

export const GET_CATEGORY_POST_QUERY_KEY = "categories_post";

type Payload = {
    category_id: number;
};
const get = async ({ category_id }: Payload) => {
    let query = "/category";
    if (category_id) {
        query = `/category?category_id=${category_id}`;
    }
    const { data } = await api.get(query);
    return data;
};

export const getCategoriesOptions = (rest: Payload) =>
    queryOptions({
        queryKey: [GET_CATEGORY_POST_QUERY_KEY],
        queryFn: () => get(rest),
    });

type UseGetCategorisType = {
    queryConfig?: QueryConfig<typeof getCategoriesOptions>;
    rest: Payload;
};

export const useGetCategoryPost = ({
    queryConfig,
    rest,
}: UseGetCategorisType) => {
    return useQuery({
        ...getCategoriesOptions(rest),
        ...queryConfig,
    });
};
