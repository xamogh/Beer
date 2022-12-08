import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Server } from "../setup";

export interface BeerQuery {
    id: number;
    name: string;
    genre: string;
    description: string;
    image: string;
    created_at: Date;
}

export type BeerMutation = Omit<BeerQuery, "id">;
export type BeerMutationResponse = BeerQuery;

export const getMyBeersApi = () => Server.get<Array<BeerQuery>>("/beer");
export const postMyBeerApi = (body: BeerMutation) =>
    Server.post<BeerMutationResponse>("/beer", body);

export function useMyBeers() {
    return useQuery({
        queryKey: ["myBeers"],
        queryFn: async () => {
            const response = await getMyBeersApi();
            return response.data;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchIntervalInBackground: true,
        refetchInterval: 120000,
    });
}

export function useCreateMyBeer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postMyBeerApi,
        onSuccess: ({ data }) => {
            queryClient.setQueryData(["myBeers"], (prevData) => {
                return [data, ...(prevData as Array<BeerQuery>)];
            });
        },
    });
}
