#!/bin/bash
./node_modules/less/bin/lessc assets/less/base.less assets/css/_base.css
./node_modules/clean-css-cli/bin/cleancss assets/css/_base.css -o assets/css/base.css -O1 -O2 "restructureRules:on"
rm assets/css/_base.css