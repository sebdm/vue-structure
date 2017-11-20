# testa-vue

> A Vue.js project

## Project Setup

This project uses unpublished npm packages, until this is fixed we need to use npm link.

``` bash
# npm link
cd component-mixins
npm link

cd ..
cd data-services
npm link

cd ..
cd data-manager
npm link data-services
npm link

cd ..
cd xray
npm link component-mixins
npm link data-manager
npm install

```

Check xray/README.md for details on how to run the project.
