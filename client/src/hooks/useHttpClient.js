import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //what if the req is on the way and when we switch the page =>
  //we're trying to update state on a component that has unmounted => error
  //we need to cancel the ongoing http req
  const activeHttpReqs = useRef([]); //a reference which will not be re-initialized when cpm re-renders

  //reference: piece of data that will not be re-initialized (remains unchanged)

  //wrapped sendReq in a 'useCallback' hook to prevent it from being re-created every render
  //and avoid infinite loops
  const sendReq = useCallback(
    async (url, method = 'GET', body = null, headers = {}, credentials) => {
      if (method === 'GET') {
        setIsLoading(true);
      }
      const httpAbortCtrl = new AbortController();
      //add the AbortController API to activeHttpReqs array
      activeHttpReqs.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, //assign abortCtrl to a req
          credentials,
        });
        const responseData = await response.json(); //parse the response body

        //remove abortCtrl from the array of controllers once the req completes
        activeHttpReqs.current = activeHttpReqs.current.filter(
          (reqCtrl) => reqCtrl !== !httpAbortCtrl
        );
        //fetch returns a response with error msg ? => still a response
        //the error does not make it to the catch block
        //auth.login() runs when it shouldn't

        //Solution:
        //is response.ok != 200 (is there an error) => to be caught by the 'catch' block
        if (!response.ok) {
          //400 or 500 status code
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData; //for our component
      } catch (err) {
        setError(err.message || 'Something went wrong...');
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    //'cleanup' fn that runs before the next time useEffect runs again and also when component
    //using this custom hook unmounts
    return () => {
      //abort the request
      activeHttpReqs.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  //component using the hook needs access to these
  return { isLoading, error, sendReq, clearError, setError };
};

export default useHttpClient;
