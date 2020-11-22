import axios, { AxiosPromise } from "axios";
import { baseUrl } from "../../config";
import { LoginDataI, SignUpDataI } from "../../types";

interface RequestData {
  url: string;
  data: LoginDataI | SignUpDataI;
  config: object;
}

type requestType = {
  post: (requestObjet: RequestData) => AxiosPromise<any>;
};

const agent: requestType = {
  post: (requestObjet: RequestData): AxiosPromise<any> =>
    axios({
      ...requestObjet.config,
      method: "post",
      url: `${baseUrl}${requestObjet.url}`,
      data: requestObjet.data,
    }),
};

export default agent;
