FROM ubuntu

ARG VERSION

ENV VERSION="$VERSION"
RUN mkdir -p /spotify-insights/dataanalyser
WORKDIR /spotify-insights/dataanalyser
COPY _build/dataanalyser-${VERSION} dataanalyser-${VERSION}
RUN ln -s dataanalyser-${VERSION} dataanalyser
