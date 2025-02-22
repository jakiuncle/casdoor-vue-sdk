// Copyright 2022 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Sdk from "casdoor-js-sdk";
import {isVue2} from "vue-demi";
import { CASDOOR_SDK_INJECTION_KEY } from "@/token";

export default {
  install(app, options) {
    let CasdoorSDK = new Sdk(options);

    if(isVue2){
      app.prototype.getSignupUrl = () => {
        return CasdoorSDK.getSignupUrl();
      };

      app.prototype.getSigninUrl = () => {
        return CasdoorSDK.getSigninUrl();
      };

      app.prototype.getUserProfileUrl = (userName, account) => {
        return CasdoorSDK.getUserProfileUrl(userName, account);
      };

      app.prototype.getMyProfileUrl = (account) => {
        return CasdoorSDK.getMyProfileUrl(account);
      };

      app.prototype.signin = (ServerUrl, signinPath) => {
        return CasdoorSDK.signin(ServerUrl, signinPath);
      };

      app.prototype.isSilentSigninRequired = () => {
        return CasdoorSDK.isSilentSigninRequired();
      }

      app.prototype.silentSignin = (isLoggedIn, onSuccess, onFailure) => {
        return CasdoorSDK.silentSignin(isLoggedIn, onSuccess, onFailure);
      }
    }else{

      app.provide(CASDOOR_SDK_INJECTION_KEY,
        {
          getSignupUrl: CasdoorSDK.getSignupUrl.bind(CasdoorSDK),
          getSigninUrl: CasdoorSDK.getSigninUrl.bind(CasdoorSDK),
          getUserProfileUrl: CasdoorSDK.getUserProfileUrl.bind(CasdoorSDK),
          getMyProfileUrl: CasdoorSDK.getMyProfileUrl.bind(CasdoorSDK),
          signin: CasdoorSDK.signin.bind(CasdoorSDK),
          isSilentSigninRequired: CasdoorSDK.isSilentSigninRequired.bind(CasdoorSDK),
          silentSignin: CasdoorSDK.silentSignin.bind(CasdoorSDK)
        }
      );

      app.config.globalProperties.getSignupUrl = () => {
        return CasdoorSDK.getSignupUrl();
      };

      app.config.globalProperties.getSigninUrl = () => {
        return CasdoorSDK.getSigninUrl();
      };

      app.config.globalProperties.getUserProfileUrl = (userName, account) => {
        return CasdoorSDK.getUserProfileUrl(userName, account);
      };

      app.config.globalProperties.getMyProfileUrl = (account) => {
        return CasdoorSDK.getMyProfileUrl(account);
      };

      app.config.globalProperties.signin = async (ServerUrl) => {
        const code = window.location.href.split('code=')[1].split('&')[0];
        const state = window.location.href.split('state=')[1].split('&')[0];
        const res = await fetch(`${ServerUrl}/api/signin?code=${code}&state=${state}`, {
          method: "POST",
          credentials: "include"
        })
        return await res.json()
      };

      app.config.globalProperties.isSilentSigninRequired = () => {
        return CasdoorSDK.isSilentSigninRequired();
      };

      app.config.globalProperties.silentSignin = (isLoggedIn, onSuccess, onFailure) => {
        return CasdoorSDK.silentSignin(isLoggedIn, onSuccess, onFailure);
      };
    }


  }
}
