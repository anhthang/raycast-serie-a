import { Grid, List } from "@raycast/api";

export const seasons = {
  "2022-23": "150052",
  "2021-22": "30030",
  "2020-21": "150051",
  "2019-20": "120066",
  "2018-19": "120056",
  "2017-18": "120076",
  "2016-17": "120167",
  "2015-16": "120160",
  "2014-15": "120077",
  "2013-14": "120161",
  "2012-13": "120123",
  "2011-12": "120070",
  "2010-11": "120093",
  "2009-10": "120100",
  "2008-09": "120139",
  "2007-08": "120146",
  "2006-07": "120092",
  "2005-06": "120062",
  "2004-05": "120116",
  "2003-04": "120061",
  "2002-03": "120127",
  "2001-02": "120136",
  "2000-01": "120057",
  "1999-00": "120108",
  "1998-99": "120098",
  "1997-98": "120065",
  "1996-97": "120114",
  "1995-96": "120074",
  "1994-95": "120072",
  "1993-94": "120163",
  "1992-93": "120091",
  "1991-92": "120128",
  "1990-91": "120122",
  "1989-90": "120084",
  "1988-89": "120117",
  "1987-88": "120156",
  "1986-87": "120089",
};

export default function SeasonDropdown(props: {
  type?: string;
  useTitle?: boolean;
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}) {
  const DropdownComponent =
    props.type === "grid" ? Grid.Dropdown : List.Dropdown;

  return (
    <DropdownComponent
      tooltip="Filter by Competition"
      value={props.selected}
      onChange={props.onSelect}
    >
      {Object.entries(seasons).map(([title, seasonId]) => {
        return (
          <DropdownComponent.Item
            key={seasonId}
            value={props.useTitle ? title : seasonId}
            title={title}
          />
        );
      })}
    </DropdownComponent>
  );
}
