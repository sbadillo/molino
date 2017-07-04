#!/bin/bash

# get local timestamp

# get deployed timestamp
tslocal=`cat ./timestamp.txt`

echo "**"
echo " Last pushed was:	-[ ${tslocal} ]-"

sleep 3
tsonline=$(wget sbadillo.github.io/molinos/timestamp-online.txt -q -O -) 

while [[ "$tslocal" != "$tsonline" ]]
do
	sleep 10
	tsonline=$(wget sbadillo.github.io/molinos/timestamp-online.txt -q -O -) 
	echo "checking... not yet.       ${tsonline}"
done

echo "Found match!:    -->     [ ${tsonline} ]"
echo "https://sbadillo.github.io/molinos"

paplay /usr/share/sounds/freedesktop/stereo/complete.oga
