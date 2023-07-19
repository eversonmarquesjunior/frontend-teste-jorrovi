import axios, { AxiosPromise } from "axios"
import { ProdutoData } from "../interface/ProdutoData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<ProdutoData[]> => {
    const response = axios.get(API_URL + '/produto');
    return response;
}

export function useProdutoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['produto-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}