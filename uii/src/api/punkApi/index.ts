import { useInfiniteQuery } from "@tanstack/react-query";
import { PunkApi } from "../setup";

type PunkApiBeersIngredient =
    | string
    | Array<{
          name: string;
          amount: { value: number; unit: string };
          add: string;
          attribute: string;
      }>;

export interface PunkApiBeer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: Date;
    description: string;
    image_url: string;
    ingredients: Record<string, PunkApiBeersIngredient>;
}

export const getBeersApi = ({ page }: { page: number }) =>
    PunkApi.get<Array<PunkApiBeer>>("", {
        params: { page, per_page: 10 },
    });

export const getIngredientNames = (punkApiBeer: PunkApiBeer) =>
    Object.keys(punkApiBeer.ingredients).join(", ");

export function useBeers() {
    return useInfiniteQuery(
        ["beers"],
        async ({ pageParam = 1 }) => {
            const response = await getBeersApi({ page: pageParam });
            return response.data;
        },
        { refetchOnWindowFocus: false }
    );
}
