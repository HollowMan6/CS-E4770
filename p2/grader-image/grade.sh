#!/bin/bash

echo "--Submitted code--"
cat /app/submission/submitted_code.data
echo ""
echo "------------------"

RND=$(( $RANDOM % 10 ))

sleep $(( $RND + 5 ))

if [ $RND -lt 5 ]; then
  RES="PASS"
elif [ $RND -lt 9 ]; then
  RES="FAIL"
else
  RES="ERROR"
fi

echo $RES > /app/submission/result.data
