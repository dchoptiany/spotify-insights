FROM ubuntu

ARG VERSION

ENV VERSION="$VERSION"
RUN mkdir -p /spotify-insights/dataanalyser_api/tmp
WORKDIR /spotify-insights/dataanalyser_api
COPY _build/dataanalyser_api-${VERSION} dataanalyser_api-${VERSION}
#COPY --from=spotify-insights-dataanalyser:latest /spotify-insights/dataanalyser/dataanalyser dataanalyser_cli
#COPY --from=spotify-insights-dataanalyser:latest /spotify-insights/dataanalyser/* .
COPY --from=spotify-insights-dataanalyser:latest /spotify-insights/dataanalyser/bin bin
COPY docker/entrypoint.sh entrypoint.sh
RUN apt-get update
RUN apt-get install -y ca-certificates iproute2
RUN ln -s dataanalyser_api-${VERSION} dataanalyser_api
CMD [ "/spotify-insights/dataanalyser_api/entrypoint.sh" ]
