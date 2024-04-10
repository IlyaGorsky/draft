import { HasRequiredKeys } from 'type-fest'
import type { Query, Response } from './types'
import { request } from './request'

interface FetcherRequestMethod {
    <D extends object>(query: Query): Promise<Response<D>>
    <D extends object, V extends object>( query: Query, variables: HasRequiredKeys<V> extends true ? V : Partial<V> ): Promise<Response<D>>
}

export class Fetcher {
    public origin: string
    public url: string

    constructor(url: string) {
        const graphql = new URL(url)
        this.url = graphql.toString()
        this.origin = graphql.origin
    }

    mutation: FetcherRequestMethod = async (query: Query, variables = {}) => {
        return request(this.url, query, variables)
    }

    query: FetcherRequestMethod = async ( query: Query, variables = {} ) => {
        return request(this.url, query, variables)
    }
}

