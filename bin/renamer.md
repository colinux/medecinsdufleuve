# How to rename files in batch with respect of numerical order

print -lr -- assets/images/missions/photo\ *.jpg(n) | tr \\n \\0 | xargs -0 rename -c -N 01 -X -e '$_ = "mission-50_$N"' -n
print -lr -- assets/images/missions/mission-51*.jpg(n) | tr \\n \\0 | xargs -0 rename -c -N 01 -X -e '$_ = "mission-52-53_$N"' -n

- (n) force the numerical sort
- tr \\n \0 makes the output compatible with xargs for files containing space
- remove -n to applies change

Note: currently this renames in the current directory

