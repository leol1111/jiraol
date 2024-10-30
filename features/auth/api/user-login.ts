import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";


import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            try {
                const response = await client.api.auth.login["$post"]({ json });
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