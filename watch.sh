DD=$(date +%d)
DAY=${1:-${DD}}
deno run --watch --allow-read --unstable ${DAY}/${DAY}.ts 