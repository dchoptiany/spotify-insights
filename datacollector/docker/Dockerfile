FROM ubuntu

ARG VERSION

ENV VERSION="$VERSION"
RUN mkdir -p /spotify-insights/datacollector
WORKDIR /spotify-insights/datacollector
COPY _build/datacollector-${VERSION} datacollector-${VERSION}
COPY config/playlists_id.txt playlists_id.txt
RUN apt-get update
RUN apt-get install -y ca-certificates iproute2
COPY docker/spotify.pem /usr/local/share/ca-certificates/spotify.pem
RUN update-ca-certificates
RUN ln -s datacollector-${VERSION} datacollector
CMD [ "/spotify-insights/datacollector/entrypoint.sh" ]
CMD [ "/spotify-insights/datacollector/datacollector" ]
