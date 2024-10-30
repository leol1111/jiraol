import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";


import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            try {
                const response = await client.api.auth.logout["$post"]();
                return await response.json();
              } catch (error) {
                console.error("Error during login mutation:", error);
                throw error; // Re-throw the error to allow error handling in `useMutation`
              }

        },
        onSuccess: () => {
           router.refresh();
           queryClient.invalidateQueries({ queryKey: ["current"] });
        }
    });
    return mutation;
}