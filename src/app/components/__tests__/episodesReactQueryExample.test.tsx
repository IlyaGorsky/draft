import React from 'react'
import { describe, expect, test } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, fireEvent } from '@testing-library/react'

import EpisodesWithReactQueryExample from '../episodesReactQueryExample'
import mockGraphQL from '../../../api/tests/mockGraphQL'
import { mockFirst2Query } from '../../_generated_/first2.query.generated'

describe('<EpisodesWithReactQuery/>', () => {
    test('correct render with click button show episodes', async () => {
        const expectedHTML = `<ul><li>Test-1</li></ul>`
        const result = render(
            <QueryClientProvider client={new QueryClient()}>
                <EpisodesWithReactQueryExample />
            </QueryClientProvider>
        )
        const mock = mockGraphQL(mockFirst2Query.operationName)

        mock.reply(
            mockFirst2Query(() => ({
                __typename: 'Query',
                episodes: {
                    __typename: 'Episodes',
                    results: [
                        {
                            __typename: 'Episode',
                            name: 'Test-1',
                        },
                    ],
                },
            }))
        )

        if (result.getByRole('button')) {
            const jumpNextMicroTask = new Promise((r) => setTimeout(r, 100))
            fireEvent(
                result.getByRole('button'),
                new MouseEvent('click', {
                    bubbles: true,
                })
            )
            await jumpNextMicroTask;
        }
        expect(result.container.innerHTML).toStrictEqual(expectedHTML)
    })
})
