# to build, run this command in same directory
# 'docker build -t undecided/ui .'

#UI
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/UI/ /etc/nginx/sites-available
