import { useAxios } from '../hooks/useAxios';
import axios from '../api/dadJokes';

export const Jokes = () => {
   const [joke, error, loading, refetch] = useAxios({
      axiosInstance: axios,
      method: 'GET',
      url: '/',
      requestConfig: {
         headers: {
            'Content-Language': 'en-US',
         },
      },
   });

   return (
      <article>
         <h2>Random Dad Jokes</h2>
         {loading && <p>Loading...</p>}
         {!loading && error && <p>{error}</p>}
         {!loading && !error && joke && <p>{joke?.joke}</p>}
         {!loading && !error && !joke && <p>No dad jokes to display.</p>}
         <button onClick={refetch}>Get Joke</button>
      </article>
   );
};
