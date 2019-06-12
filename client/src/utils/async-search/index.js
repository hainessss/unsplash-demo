import { Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, map } from 'rxjs/operators';

const spellcheck = ({query}) => {
  return fetch(`/spellcheck?query=${query}`).then(response => response.json());
};

export default function AsyncSearchStream(query) {
  const AsyncSearch = new Subject()

  return AsyncSearch.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    filter(term => term.length > 2),
    switchMap(value => {
      return from(spellcheck({query: value})).pipe(
        map(({suggestions}) => {
          return suggestions.length 
            ? {
              term: suggestions[0],
              isSuggestion: true
            }
            : {
              term: value
            }
        })
      );
    }),
    switchMap(({term, isSuggestion = false}) => {
      return from(query(term)).pipe(
        map((data) => ({
          data,
          suggestion: isSuggestion ? term : null
        }))
      );
    })
  )
};