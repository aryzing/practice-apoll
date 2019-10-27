FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY dist /data/www
COPY config/nginx.conf /etc/nginx/nginx.conf
