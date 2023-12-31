import { useState } from "react";
import { MutationReturnType } from "../type/type";


export default function useMutation(url: string): MutationReturnType {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<undefined | any>(undefined)
    const [error, setError] = useState<undefined | any>(undefined)

    function mutation(data: any, method: string = "POST") {
        setLoading(true)
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json().catch(() => { }))
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }

    return [mutation, { loading, data, error }];
}

