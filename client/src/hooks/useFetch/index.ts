import React, { useState, useEffect, useCallback } from "react";
import { LoginDataI, SignUpDataI } from "../../types";
import {
  PENDING,
  DONE,
  ERROR,
  FetchDispatchTypes,
} from "../../context/authActions";
import agent from "./agent";

const useFetch = (
  requestUrl: string | null = null,
  postData: LoginDataI | SignUpDataI,
  dispatch: React.Dispatch<FetchDispatchTypes> | null
) => {
  const [{ url, data }, setConfig] = useState({
    url: requestUrl,
    data: postData,
  });

  const [fetchResult, setResult] = useState({
    data: null,
    error: null,
  });

  useEffect(() => {
    let didCancel = false;

    if (!url) return;

    (async () => {
      if (dispatch) {
        dispatch({ type: PENDING });
      }

      if (!url) {
        return undefined;
      }

      try {
        const result = await agent.post({
          url,
          config: {
            timeout: 1000,
          },
          data: postData,
        });

        if (!didCancel) {
          if (dispatch) {
            dispatch({
              type: DONE,
              payload: result.data.data.user,
            });
          }
          setResult({
            ...fetchResult,
            data: result.data.data.user,
            error: null,
          });
        }
      } catch (error) {
        if (!didCancel) {
          if (dispatch) {
            dispatch({
              type: ERROR,
              payload: error.response
                ? error.response.data.error || error.response.error
                : "Error performing request",
            });
          }
          setResult({
            ...fetchResult,
            data: null,
            error: error.response
              ? error.response.data.error || error.response.error
              : "Error performing request",
          });
        }
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [url, data]);

  const doSend = useCallback(
    (sendUrl: string, postData: SignUpDataI | LoginDataI) => {
      setConfig({
        url: sendUrl,
        data: postData,
      });
    },
    []
  );

  return {
    ...fetchResult,
    doSend,
  };
};

export default useFetch;
