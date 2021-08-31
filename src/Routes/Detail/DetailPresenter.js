import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { useTabs } from "hooks";
import About from "Components/About";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  height: 100%;
  width: 35%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  height: 100%;
  width: 65%;
  margin: 0 30px;
`;

const Title = styled.h3`
  font-size: 34px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  font-size: 17px;
  margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.5;
  width: 65%;
`;
const IMDB = styled.span`
  margin-top: 10px;
  padding: 2px;
  border: solid orange 2px;
  border-radius: 2px;
`;

const IMDBLink = styled.a``;

const DetailPresenter = ({ result, error, loading }) => {
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${result.poster_path}`
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../asset/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date?.substring(0, 4)
                : result.first_air_date?.substring(0, 4)}
            </Item>
            {result.release_date || result.first_air_date ? (
              <Divider>·</Divider>
            ) : (
              ""
            )}
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>·</Divider>
            <Item>Language - {result.original_language}</Item>
            <Divider>·</Divider>
            <Item>⭐️ {result.vote_average}</Item>
            <Item>
              {result.imdb_id ? (
                <>
                  <Divider>·</Divider>

                  <IMDB>
                    <IMDBLink
                      href={`https://www.imdb.com/title/${result.imdb_id}/`}
                    >
                      IMDB
                    </IMDBLink>
                  </IMDB>
                </>
              ) : (
                ""
              )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <About
            seasons={result.seasons}
            companies={
              result.production_companies.length > 0
                ? result.production_companies
                : null
            }
            countries={result.production_countries}
          />
        </Data>
      </Content>
    </Container>
  );
};
DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
