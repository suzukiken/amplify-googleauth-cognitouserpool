+++
title = "CognitoにAmplify JavaScriptでGoogle SSOでログインする方法2"
date = "2021-03-23"
tags = ["Cognito", "Amplify", "Google", "SSO"]
+++

![img](/img/2021/03/amplify-googleauth-cognitouserpool.png)

バックエンドについては[Cognitoの設定の記事](/aws/cognito-user-pool-with-google-auth)に書いたものが既にある前提で、その仕組みにログインするためのJavaScriptの話です。

[Githubのリポジトリ](https://github.com/suzukiken/amplify-googleauth-cognitouserpool)

このリポジトリのコードのデプロイ方法はAmplifyコンソールを使うという前提になっていて、そのデプロイの仕組みは[こちらの記事](/aws/cdkamplify)に書いた方法を使っています。

この方法ではビルド時にSystems Managerのパラメタストアからaws-exports.jsの内容を受け取るようになっているので、デプロイをする前にパラメタストアのデータは用意しておく必要があります。

ちなみに、そのaws-exports.jsの内容はこうしたものです。

```aws-exports.js
const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "ap-northeast-1:...........",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "ap-northeast-1_......",
    "aws_user_pools_web_client_id": ".............",
    "oauth": {
        "domain": ".........auth.ap-northeast-1.amazoncognito.com",
        "scope": [
            "email",
            "openid",
            "profile"
        ],
        "redirectSignIn": "https://.......example.com/",
        "redirectSignOut": "https://.......example.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

export default awsmobile;
```
