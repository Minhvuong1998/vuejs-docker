

import { RouteLocationNormalizedLoaded, Router,useRoute, useRouter } from 'vue-router';

const getAccessToken = () => {
  for (const i in localStorage) {
    if (i.match(/^CognitoIdentityServiceProvider\.(.+)\.idToken$/)) {
      const accessToken = localStorage.getItem(i);
      if (accessToken) {
        return accessToken;
      }
    }
  }
};

const apiOption = () => {
  return {
    accessToken: getAccessToken(),
    refreshToken: '',
    endpoint: <string>import.meta.env.VITE_API_ENDPOINT,
  };
};

type UseCommonResult= {
  apiOption: typeof apiOption;
  router: Router,
  route: RouteLocationNormalizedLoaded
};

const useCommon = (): UseCommonResult => {
  const router = useRouter();
  const route = useRoute();
  return {
    apiOption,
    router,
    route
  };
};

export default useCommon;

