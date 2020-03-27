## Continuous Deployment

This article outlines zero-configuration deploy to Heroku using Create React App (must do this before adding github integration):
[Step up Heroku + CRA](https://blog.heroku.com/deploying-react-with-zero-configuration).

This article outlines connecting the github repo to Heroku with auto deploymenmts from the master branch:
[Step 3: Deploy to Heroku](https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/).

## Continuous Integration

This article outlines connecting Travis CI to your github repo to run all test before deploying to Heroku with auto deploymenmts from the master branch:

[Github, Travis CI, Heroku deployment](https://docs.travis-ci.com/user/deployment/heroku/).

- To get correct Heroku auth token
  Go to Heroku Account
  Manually copy the API Key and then paste it into command line:
  For the ones hosted at travis-ci.com:
  travis encrypt pasteAPIKeyHere --add deploy.api_key --pro
  For the ones hosted at travis-ci.org:
  travis encrypt pasteAPIKeyHere --add deploy.api_key --org

[Helpful GH Issue](https://github.com/travis-ci/travis-ci/issues/10018).

## Travis CI org vs com

This stackexchange article outlines the difference between Travis CI org vs com:
[Travis CI org vs com](https://devops.stackexchange.com/questions/1201/whats-the-difference-between-travis-ci-org-and-travis-ci-com).
