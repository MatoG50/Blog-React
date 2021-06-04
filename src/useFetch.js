import { useState, useEffect } from 'react';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIspending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch data for that resource');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
        setIspending(false);
        setError(null);
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setIspending(false);
          setError(error.message);
        }
      });
    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
