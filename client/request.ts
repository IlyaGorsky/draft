/* eslint-disable no-useless-catch */
import { type ASTNode, type OperationDefinitionNode } from 'graphql'
import type { RequestFn, Query, Variables, Response } from './types'

const isOperation = (node: ASTNode): node is OperationDefinitionNode =>
    node.kind === 'OperationDefinition'

const getOperationName = (node: ASTNode): string | undefined =>
    isOperation(node) ? node.name?.value : undefined

const request: RequestFn = async <D extends object, V extends object>(
    url: string,
    query: Query,
    variables?: Variables<V>
): Promise<Response<D>> => {
    try {
        const operationName =
            typeof query === 'string'
                ? undefined
                : getOperationName(query.definitions[0])
        const api = new URL(url)
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query:
                    typeof query === 'string' ? query : query.loc?.source.body,
                variables: variables ?? null,
                operationName,
            }),
        }
        operationName && api.searchParams.append('operationName', operationName)

        const response = await fetch(api.toString(), params)
        const data = (await response.json()) as Response<D>

        if (!response.ok) {
            return Promise.reject({
                data,
                status: response.status,
                statusText: response.statusText,
            })
        }

        return data
    } catch (e) {
        throw e
    }
}

export { request }
