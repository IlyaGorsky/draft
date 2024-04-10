// Для запуска yarn demo-2
import {
    fetchFirstQuery,
    CharacterCardFragment,
} from './_generated_/first.query.generated'
import { notEmpty } from './notEmpty'

const query1 = await fetchFirstQuery()

function print(characters?: CharacterCardFragment[]) {
    if (characters) {
        characters.forEach(({ name }) => {
            console.log('first1', name)
        })
    }
}

const characters = query1.data?.characters?.results?.filter(notEmpty);

print(characters);



import { QueryClient, useQuery } from '@tanstack/react-query'


export const useCharacters = () => {
    const result = useQuery({
        queryKey: ['first'],
        queryFn: fetchFirstQuery,
    }, new QueryClient())
    const { data} = result;

    print(data?.data?.characters?.results?.filter(notEmpty))
}

useCharacters();