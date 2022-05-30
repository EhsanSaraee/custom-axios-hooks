import { useState, useEffect } from 'react';

export const useAxiosFunc = () => {
   const [response, setResponse] = useState([]);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(true);
   const [controller, setController] = useState();

   const axiosFetch = async (configObj) => {
      const { axiosInstance, method, url, requestConfig = {} } = configObj;

      try {
         setLoading(true);
         const ctrl = new AbortController();
         setController(ctrl);
         const res = await axiosInstance[method.toLowerCase()](url, {
            ...requestConfig,
            signal: ctrl.signal,
         });
         console.log(res);
         setResponse(res.data);
      } catch (err) {
         console.log(err.message);
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      return () => controller?.abort();
   }, [controller]);

   return [response, error, loading, axiosFetch];
};
