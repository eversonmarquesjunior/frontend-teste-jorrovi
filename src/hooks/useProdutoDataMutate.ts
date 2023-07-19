import axios, { AxiosPromise } from "axios"
import { ProdutoData } from "../interface/ProdutoData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: ProdutoData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/produto', data);
    return response;
}

export function useProdutoDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['produto-data'])
        }
    })

    return mutate;
}