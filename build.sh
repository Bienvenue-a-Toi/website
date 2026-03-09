#!/bin/bash

files=$(find assets/photos/ -type f -name '*.jpg')

for file in ${files[@]}; do
  echo "Convert $file..."
  convert $file -resize 1200x1200 $file
done
