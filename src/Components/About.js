import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flags from "country-flag-icons/react/3x2";
import { useTabs } from "hooks";

const AboutContainer = styled.div`
  height: 340px;
  width: 740px;
  background-color: black;
  opacity: 0.7;
  border-radius: 15px;
  margin-top: 10vh;
`;
const AboutTabContainer = styled.div`
  height: 15%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
`;

const AboutTabButton = styled.div`
  margin-top: 10px;
  height: 80%;
  width: 200px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#55d6c2" : "white")};
  border: ${(props) => (props.active ? "3px #55d6c2 solid" : "")};
`;
const AboutContents = styled.div`
  margin-top: 25px;
  padding: 0px 20px;
  height: 70%;
  width: 100%;
  font-size: 13px;
  background-color: black;
  color: "#55d6c2";
`;

const SeasonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`;
const Season = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const SeasonName = styled.span`
  /* color: black; */
  margin-top: 20px;
`;
const SeasonImage = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  width: 130px;
  background-size: cover;
  border-radius: 7px;
  background-position: center center;
  background-repeat: no-repeat;
  transition: opacity 0.1 linear;
  background-color: white;
`;

const CompaniesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  align-items: center;
`;
const Company = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CompanyName = styled.span`
  /* color: black; */
  margin-top: 20px;
`;
const CompanyImage = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 150px;
  width: 150px;
  background-size: contain;
  border-radius: 70px;
  background-position: center center;
  background-repeat: no-repeat;
  transition: opacity 0.1 linear;
  background-color: white;
`;
const CountriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const Country = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CountryImage = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 150px;
  width: 150px;
  background-size: contain;
  border-radius: 70px;
  background-position: center center;
  background-repeat: no-repeat;
  transition: opacity 0.1 linear;
  background-color: white;
`;
const CountryName = styled.span`
  margin-top: 20px;
`;

const About = ({ seasons, companies, countries }) => {
  console.log(countries);
  const allTabs = [
    {
      index: 0,
      tab: "Season Info",
      data: seasons ? (
        <SeasonsContainer>
          {seasons.map((season) => (
            <Season key={season.id}>
              <SeasonImage
                bgUrl={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                    : require("../asset/noPosterSmall.png").default
                }
              />
              <SeasonName>{season.name}</SeasonName>
            </Season>
          ))}
        </SeasonsContainer>
      ) : (
        <span>Not Found!</span>
      ),
    },
    {
      index: 1,
      tab: "Created by Info",
      data: companies ? (
        <CompaniesContainer>
          {companies.map((company) => (
            <Company key={company.id}>
              <CompanyImage
                bgUrl={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/w300${company.logo_path}`
                    : require("../asset/noLogo.png").default
                }
              />
              <CompanyName>{company.name}</CompanyName>
            </Company>
          ))}
        </CompaniesContainer>
      ) : (
        <span>Not Found!</span>
      ),
    },
    {
      index: 2,
      tab: "Country Info",
      data: countries ? (
        <CountriesContainer>
          {countries.map((country) => (
            <Country key={country.iso_3166_1}>
              <CountryImage
                bgUrl={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${country.iso_3166_1}.svg`}
              />
              <CountryName>{country.name}</CountryName>
            </Country>
          ))}
        </CountriesContainer>
      ) : (
        // <span>{countries[0].name}</span>
        <span>Not Found!</span>
      ),
    },
  ];
  const { currentItem, changeItem } = useTabs(0, allTabs);

  return (
    <AboutContainer>
      <AboutTabContainer>
        {allTabs.map((section, index) => (
          <AboutTabButton
            onClick={() => {
              changeItem(index);
            }}
            active={index === currentItem.index}
          >
            {section.tab}
          </AboutTabButton>
        ))}
      </AboutTabContainer>
      <AboutContents>{currentItem.data}</AboutContents>
    </AboutContainer>
  );
};

export default About;
