import React from 'react'
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Episodes from './components/episodes'
import EpisodesWithReactQueryExample from './components/episodesReactQueryExample'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root')!);

const App = () => (
    <QueryClientProvider client={client}>
        <h2>Example fetchFn</h2>
        <Episodes />
        <h2>Example WithReactQuery</h2>
        <EpisodesWithReactQueryExample />
    </QueryClientProvider>
)

root.render(<App />)