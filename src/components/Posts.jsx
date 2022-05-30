import { useAxiosFunc } from '../hooks/useAxiosFunc';
import axios from '../api/jsonPH';
import { useEffect } from 'react';

export const Posts = () => {
   const [posts, error, loading, axiosFetch] = useAxiosFunc();

   const getData = async () => {
      axiosFetch({
         axiosInstance: axios,
         method: 'GET',
         url: '/posts',
      });
   };

   useEffect(() => {
      getData();
      // eslint-disable-next-line
   }, []);

   const handleSubmit = () => {
      axiosFetch({
         axiosInstance: axios,
         method: 'POST',
         url: '/posts',
         requestConfig: {
            data: {
               userId: 10,
               title: 'Axios stuff',
               body: 'Axios hook stuff',
            },
         },
      });
   };

   return (
      <article>
         <h2>Posts</h2>

         <div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={getData}>Refetch</button>
         </div>

         {loading && <p>Loading...</p>}
         {!loading && error && <p>{error}</p>}
         {!loading && !error && posts?.length && (
            <ul>
               {posts.map((post, i) => (
                  <li key={i}>{`${post.id}. ${post.title}`}</li>
               ))}
            </ul>
         )}
         {!loading && !error && !posts?.length && posts?.data && (
            <p>
               {`userId: ${posts?.data?.userId}, title: ${posts?.data?.title}, body: ${posts?.data?.body}`}
            </p>
         )}
         {!loading && !error && !posts && <p>No posts to display.</p>}
      </article>
   );
};
