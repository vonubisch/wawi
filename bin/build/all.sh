#!/bin/bash

date +"%T";

cd .. && cd .. &&

cd services/ui && yarn build &&

cd .. && cd .. &&

rm -rf services/extension-chrome/build &&

mkdir services/extension-chrome/build &&
mkdir services/extension-chrome/build/ui &&

cp -rf services/ui/build/* services/extension-chrome/build/ui &&

cd services/extension-chrome && yarn build &&

date +"%T";