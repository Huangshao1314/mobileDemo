#!/bin/bash
echo VUE_APP_MOCK=MOCK > .env.local
cat .env.local
npm run build:staging
rsync -av ./dist/ igtb@22.11.38.5::igtb

rm -rf ./dist/
echo VUE_APP_MOCK=NO_MOCK > .env.local
cat .env.local
npm run build:staging
rsync -av ./dist/ igtb@2.11.38.5::igtbmock
