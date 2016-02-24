BOARD=sonicoc/figmas
NOTES="Vocaloid Figure"
STORE_URL=https://anime-figures.com/blogs/news/88888897-my-favorite-anime-7?utm=pint
IMAGE_URL=https://s-media-cache-ak0.pinimg.com/564x/90/2d/7b/902d7bb8f95c21ced50d4750299caf1a.jpg \

API_END_POINT=https://api.pinterest.com/v1/pins/?access_token=AZM6hUU-NsZcJFumRixZgJFKVqvaFDTDldg_w6dC4BQxSoAraAAAAAA

curl -POST -F board=$BOARD -F note=$NOTES -F link=$STORE_URL -F image_url=$IMAGE_URL $API_END_POINT



