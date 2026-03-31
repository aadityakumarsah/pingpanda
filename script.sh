#!/bin/zsh

echo "Generating realistic commits..."

for day in {1..100}
do
  commits=$((RANDOM % 10 + 1))

  for ((i=1; i<=commits; i++))
  do
    echo "Day $day Commit $i" >> commit.txt
    
    git add .
    
    GIT_COMMITTER_DATE="$(date -v-$day"d")" \
    git commit --date="$(date -v-$day"d")" -m "Update $day-$i"
  done
done