#!/bin/bash
date +"%T"

cd .. && cd .. &&

cd services/extension-chrome && 

webpack --config webpack.config.js && 

cp -rf ./public/* ./build/ &&

date +"%T"
