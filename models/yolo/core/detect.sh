#!/bin/sh

CUDA_VISIBLE_DEVICES='' python framework/detect.py \
  --save-txt \
  --img-size=416 \
  --weights=core/model.pt \
  --source=input \
  --output=framework/inference

rm -rf output/* output/.* 2> /dev/null

cp framework/inference/*.txt output 2> /dev/null
