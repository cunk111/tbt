## Tomi's Backend Template
------------------------

#### Prerequisite
- node engine v18+
- git cli
- yarn or npm
- docker desktop


#### installation
`gh repo clone cunk111/tbt` using github CLI

or

`https://github.com/cunk111/tbt.git` using https

and finally

`cd tbt && yarn install`

#### Get it running

First you'll need to fill env files, located in the env/ folder, following the template provided,
those files are expected to be named ```.env.production``` and/or ```.env.development```

You'll need to run two services, a docker image for postgres db and the mere node server

first run `yarn run db:up`

on a second promp, run `yarn run dev` or `yarn run start`